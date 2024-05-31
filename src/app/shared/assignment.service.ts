import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';
import { Assignment } from '../assignment/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {
    this.loggingService.setLoggingLevel(1);
  }

  url = 'http://localhost:8010/api/assignments';

  getAssignments(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  } 

  getAssignment(id: number): Observable<Assignment | undefined> {
   

    return this.http.get<Assignment>(this.url + '/' + id)
    .pipe(
      tap(a => console.log('avant modification ' + a.nom)),
      map(a => { a.nom += " MODIFIE PAR MAP"; return a;}),
      
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} a échoué: ${error.message}`);
      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'ajouté');
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'modifié');
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'supprimé');

    return this.http.delete(this.url + '/' + assignment._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach((a) => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.prof = a.prof;
      nouvelAssignment.matiereImage = a.matiereImage;
      nouvelAssignment.profPhoto = a.profPhoto;

      this.addAssignment(nouvelAssignment).subscribe((reponse) => {
        console.log(reponse.message);
      });
    });
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment: any[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment: any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.prof = a.prof;
      nouvelAssignment.matiereImage = a.matiereImage;
      nouvelAssignment.profPhoto = a.profPhoto;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }
}
