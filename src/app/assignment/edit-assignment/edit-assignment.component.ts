import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../../shared/assignment.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})

export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  matieres: string[] = ['Maths', 'Physics'];
  nomAssignment?: string;
  dateDeRendu?: Date;
  auteur?: string;
  matiere?: string;
  remarques?: string;
  note?: number;
  prof?: string;

  constructor(
    private assignmentsService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/']);
    }

   
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignment = assignment;
  
        // Utilisation de l'opérateur de navigation sécurisé (?.) pour éviter les erreurs si assignment est null ou undefined
        this.nomAssignment = assignment?.nom?.replace('MODIFIE PAR LE PIPE', '').trim();
        this.dateDeRendu = assignment?.dateDeRendu;
        this.auteur = assignment?.auteur;
        this.matiere = assignment?.matiere;
        this.remarques = assignment?.remarques;
        this.note = assignment?.note;
        this.prof = assignment?.prof;
      });
  }
  

  onSaveAssignment(): void {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }
  
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
  
    if (this.auteur) {
      this.assignment.auteur = this.auteur;
    }
  
    if (this.matiere) {
      this.assignment.matiere = this.matiere;
    }
  
    if (this.remarques) {
      this.assignment.remarques = this.remarques;
    }
  
    if (this.note) {
      this.assignment.note = this.note;
    }
  
    if (this.prof) {
      this.assignment.prof = this.prof;
    }

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/details-assignment/' + this.assignment.id]);
      });
  }
}
