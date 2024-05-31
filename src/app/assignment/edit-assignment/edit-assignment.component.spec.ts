import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAssignmentComponent } from './edit-assignment.component';
import { AssignmentService } from '../../shared/assignment.service';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

describe('EditAssignmentComponent', () => {
  let component: EditAssignmentComponent;
  let fixture: ComponentFixture<EditAssignmentComponent>;
  let mockAssignmentService;
  let mockAuthService;
  let mockRouter;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockAssignmentService = jasmine.createSpyObj(['getAssignment', 'updateAssignment']);
    mockAuthService = { loggedIn: true, currentUser: [{ isAdmin: true }] };
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        params: { id: 1 },
        queryParams: {},
        fragment: ''
      }
    };

    await TestBed.configureTestingModule({
      declarations: [EditAssignmentComponent],
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
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load assignment on init', () => {
    mockAssignmentService.getAssignment.and.returnValue(of({
      id: 1,
      nom: 'Test Assignment',
      dateDeRendu: new Date(),
      rendu: false,
      auteur: 'Student A',
      matiere: 'Maths',
      note: 15,
      remarques: 'Good work',
      prof: 'Prof A',
      matiereImage: 'image.jpg',
      profPhoto: 'prof.jpg'
    }));

    component.ngOnInit();

    expect(component.assignment).toBeTruthy();
    expect(component.assignment?.nom).toEqual('Test Assignment');
  });

  it('should save assignment', () => {
    const updatedAssignment = {
      id: 1,
      nom: 'Updated Assignment',
      dateDeRendu: new Date(),
      rendu: false,
      auteur: 'Student A',
      matiere: 'Maths',
      note: 15,
      remarques: 'Good work',
      prof: 'Prof A',
      matiereImage: 'image.jpg',
      profPhoto: 'prof.jpg'
    };
    component.assignment = updatedAssignment;
    mockAssignmentService.updateAssignment.and.returnValue(of({ message: 'Updated successfully' }));

    component.onSaveAssignment();

    expect(mockAssignmentService.updateAssignment).toHaveBeenCalledWith(updatedAssignment);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details-assignment/1']);
  });
});
