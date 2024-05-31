// src/app/assignment/add-assignment/add-assignment.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../../shared/assignment.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  nomAssignment: string = '';
  dateDeRendu?: Date;
  auteur: string = '';
  matiere: string = '';
  note?: number;
  remarques?: string;
  prof: string = '';
  matiereImage: string = '';
  profPhoto: string = '';
  peupler = false;
  isAdded = false;

  matieres = [
    { name: 'Maths', image: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}", prof: 'Prof A', profPhoto: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}" },
    { name: 'Physics', image: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}", prof: 'Prof B', profPhoto: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}"},
    // Ajouter plus de matières ici
  ];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (!this.nomAssignment || !this.dateDeRendu || !this.auteur || !this.matiere) return;

    const newAssignment: Assignment = {
      id: Math.floor(Math.random() * 1000),
      nom: this.nomAssignment,
      dateDeRendu: this.dateDeRendu,
      rendu: false,
      auteur: this.auteur,
      matiere: this.matiere,
      note: this.note,
      remarques: this.remarques,
      prof: this.prof,
      matiereImage: this.matiereImage,
      profPhoto: this.profPhoto,
    };

    this.assignmentService.addAssignment(newAssignment)
      .subscribe((response) => {
        console.log(response.message);
        this.router.navigate(['/list-assignment']);
      });
  }

  onMatiereChange(event: any) {
    const selectedMatiere = this.matieres.find(m => m.name === event.value);
    if (selectedMatiere) {
      this.prof = selectedMatiere.prof;
      this.matiereImage = selectedMatiere.image;
      this.profPhoto = selectedMatiere.profPhoto;
    }
  }
  peuplerBD() {
    this.assignmentService.peuplerBDAvecForkJoin()
        .subscribe(() => {
          // on peut alors afficher la liste
          this.peupler = true;
        })
  }
}
