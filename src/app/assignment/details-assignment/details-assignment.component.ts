import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../../shared/assignment.service';

@Component({
  selector: 'app-details-assignment',
  templateUrl: './details-assignment.component.html',
  styleUrls: ['./details-assignment.component.scss']
})
export class DetailsAssignmentComponent implements OnInit {
  assignmentTransmis?: Assignment;
  renduNotif: boolean = false;
  

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

    const id: number = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        console.log(this.assignmentTransmis);
      });
  }

  assignProfAndMatiereImages() {
    // Assigner les images des professeurs
    switch (this.assignmentTransmis?.prof) {
      case 'Professeur A':
        this.assignmentTransmis.profPhoto = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
        break;
      case 'Professeur B':
        this.assignmentTransmis.profPhoto = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
        break;
      // Ajoutez d'autres cas pour chaque professeur
      default:
        this.assignmentTransmis.profPhoto = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
    }

    // Assigner les images des matières
    switch (this.assignmentTransmis?.matiere) {
      case 'Maths':
        this.assignmentTransmis.matiereImage = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
        break;
      case 'Physics':
        this.assignmentTransmis.matiereImage = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
        break;
      // Ajoutez d'autres cas pour chaque matière
      default:
        this.assignmentTransmis.matiereImage = "https://i.pravatar.cc/150?img=" + this.assignmentTransmis.id;
    }
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.renduNotif = true;

      this.assignmentsService.updateAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log('Assignment updated successfully', reponse);
        this.router.navigate(['/list-assignment']);
          this.assignmentTransmis = undefined;
          
        });
    }
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          this.assignmentTransmis = undefined;
        
       
            this.router.navigate(['/list-assignment']);
        
        });
    }
  }

  onClickEdit() {
    this.router.navigate(['/edit-assignment/', this.assignmentTransmis?.id, 'edit'], {
      queryParams: {
        nom: this.assignmentTransmis?.nom,
      },
      fragment: "edition"
    });
  }
  

  isAdmin(): boolean {
    return this.authService.loggedIn;
  }
}
