import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  filteredTutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  filterValue = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.applyFilter();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  applyFilter(): void {
    const scoreFilterValue = this.filterValue;

    if (scoreFilterValue) {
      this.filteredTutorials =
        this.tutorials?.filter((tutorial: Tutorial) => {
          if (tutorial.score !== undefined && tutorial.age !== undefined) {
            return (
              Number(tutorial.score) > Number(scoreFilterValue) &&
              Number(tutorial.age) < 21
            );
          }
          return false;
        }) || [];
    } else {
      this.filteredTutorials = this.tutorials;
    }
  }
}
