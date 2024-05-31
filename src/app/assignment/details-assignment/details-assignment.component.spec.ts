import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAssignmentComponent } from './details-assignment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../shared/assignment.service';
import { AuthService } from '../../shared/auth.service';
import { of } from 'rxjs';
import { Assignment } from '../assignment.model';

describe('DetailsAssignmentComponent', () => {
  let component: DetailsAssignmentComponent;
  let fixture: ComponentFixture<DetailsAssignmentComponent>;
  let assignmentServiceSpy: jasmine.SpyObj<AssignmentService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockAssignment: Assignment = {
    id: 1,
    nom: 'Assignment 1',
    dateDeRendu: new Date(),
    rendu: false,
    auteur: 'John Doe',
    matiere: 'Math',
    note: 15,
    remarques: 'Good work',
    prof: 'Professeur A',
    matiereImage: '"https://i.pravatar.cc/150?img={{assignmentTransmis.id}}"',
    profPhoto: '"https://i.pravatar.cc/150?img={{assignmentTransmis.id}}"'
  };

  beforeEach(async () => {
    assignmentServiceSpy = jasmine.createSpyObj('AssignmentService', ['getAssignment']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loggedIn']);

    await TestBed.configureTestingModule({
      declarations: [DetailsAssignmentComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        { provide: Router, useValue: {} },
        { provide: AssignmentService, useValue: assignmentServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    assignmentServiceSpy.getAssignment.and.returnValue(of(mockAssignment));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAssignment method from AssignmentService', () => {
    expect(assignmentServiceSpy.getAssignment).toHaveBeenCalledOnceWith(1);
  });

  it('should display assignment details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain(mockAssignment.nom);
    expect(compiled.querySelector('.card-category').textContent).toContain(mockAssignment.dateDeRendu.toDateString());
    expect(compiled.querySelector('.prof-photo img').src).toContain(mockAssignment.profPhoto);
  });

  // Add more test cases as needed
});

