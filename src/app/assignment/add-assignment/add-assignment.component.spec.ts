// src/app/assignment/add-assignment/add-assignment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAssignmentComponent } from './add-assignment.component';
import { AssignmentService } from '../../shared/assignment.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

describe('AddAssignmentComponent', () => {
  let component: AddAssignmentComponent;
  let fixture: ComponentFixture<AddAssignmentComponent>;
  let mockAssignmentService;
  let mockAuthService;
  let mockRouter;

  beforeEach(async () => {
    mockAssignmentService = jasmine.createSpyObj(['addAssignment']);
    mockAuthService = { loggedIn: true, currentUser: [{ isAdmin: true }] };
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddAssignmentComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
      ],
      providers: [
        { provide: AssignmentService, useValue: mockAssignmentService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new assignment', () => {
    component.nomAssignment = 'Test Assignment';
    component.dateDeRendu = new Date();
    component.auteur = 'Student A';
    component.matiere = 'Maths';
    component.note = 18; // Ajout de la note
    component.remarques = 'Excellent work'; // Ajout des remarques
    component.prof = 'Prof A';
    component.matiereImage = "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}"; 
    component.profPhoto = "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}";

    mockAssignmentService.addAssignment.and.returnValue(of({ message: 'Assignment added successfully' }));

    component.onSubmit();

    expect(mockAssignmentService.addAssignment).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-assignment']);
  });

  it('should update prof, matiereImage, and profPhoto when matiere changes', () => {
    component.matieres = [
      { name: 'Maths', image: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}", prof: 'Prof A', profPhoto: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}" },
      { name: 'Physics', image: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}", prof: 'Prof B', profPhoto: "https://i.pravatar.cc/150?img={{assignmentTransmis.id}}" }
    ];

    component.onMatiereChange({ value: 'Physics' });

    expect(component.prof).toBe('Prof B');
    expect(component.matiereImage).toBe('path/to/physics-image.jpg');
    expect(component.profPhoto).toBe('path/to/prof-b.jpg');
  });
});
