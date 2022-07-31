import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
  
export class HomeComponent implements OnInit {
  sectionIndex: number = 1;
  containers = document.getElementsByClassName('home-element-container');
  sections: [Element | null] = [this.containers[0]];

  constructor() { }

  showDetail(selectedPannelId: string, sectionDetailClass: string, activeClass: string) {

    // hiding all the visbile details 
    document.querySelectorAll('.' + sectionDetailClass).forEach((ele) => {      
      ele.classList.add('hide');
    });

    //removing active class from previous selection
    let selectedPaneSibling = document.querySelector('#' + selectedPannelId)?.parentElement?.children;

    if (selectedPaneSibling)
      for (let element of selectedPaneSibling)
        element.classList.remove(activeClass);
    
    //adding active class to selected pane
    document.getElementById(selectedPannelId)?.classList.add(activeClass);

    //making details and icons visible
    document.querySelector('.' + sectionDetailClass + '#' + selectedPannelId + 'Detail')?.classList.replace('hide', 'show');
    document.querySelector('.' + sectionDetailClass + '#' + selectedPannelId + 'Icon')?.classList.replace('hide', 'show');

  }

  scroll(id: string | undefined) {
    let scrollButtonIcon = document.getElementById('scrollButtonIcon');

    this.sectionIndex++;

    let element = this.sections[this.sectionIndex];

    //to handle clicks from navbar
    if (id != undefined) {
      element = document.getElementById(id);
      this.sectionIndex = this.sections.indexOf(element);
    }

    // In case its not the last section, arrow must point down
    if (this.sectionIndex < this.sections.length - 1) {
      scrollButtonIcon?.classList.replace('fa-arrow-up', 'fa-arrow-down');
    }

    // In case its last section, arrow must point up and
    if (this.sectionIndex == this.sections.length - 1) {
      this.sectionIndex = 0;
      scrollButtonIcon?.classList.replace('fa-arrow-down', 'fa-arrow-up');
    }

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnInit(): void {
    document.getElementById('scrollButton')?.focus();
    setTimeout(() => {
      document
        .getElementById('aboutSkillDetail')
        ?.classList.replace('hide', 'show');
      document
        .getElementById('aboutSkillIcon')
        ?.classList.replace('hide', 'show');
    }, 500);

    // //to get the parent element of all containers
    for (let i = 0; i < this.containers.length; i++)
      this.sections.push(this.containers[i]);
  }
}
