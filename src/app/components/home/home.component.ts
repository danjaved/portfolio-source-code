import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sectionIndex: number = 1;
  containers = document.getElementsByClassName('home-element-container');
  sections: [HTMLElement | null] = [null];
  constructor(private router: Router) {}

  showDetail(aboutSelected: string) {
    document
      .querySelectorAll('.about-pannel')
      .forEach((ele) => ele.classList.remove('active'));
    document
      .querySelectorAll('.detail')
      .forEach((ele) => ele.classList.add('hide'));
    document.getElementById(aboutSelected)?.classList.add('active');
    document
      .getElementById(aboutSelected + '-details')
      ?.classList.replace('hide', 'show');
    document
      .getElementById(aboutSelected + '-icon')
      ?.classList.replace('hide', 'show');
  }

  showWorkDetail(workSelected: string) {
    console.log(workSelected);
    document
      .querySelectorAll('.work-pannel')
      .forEach((ele) => ele.classList.remove('active'));
    document
      .querySelectorAll('.my-work .work-detail')
      .forEach((ele) => ele.classList.add('hide'));
    ;
    document.getElementById(workSelected)?.classList.add('active');

    document
      .getElementById(workSelected + '-detail')
      ?.classList.replace('hide', 'show');
    // document
    //   .getElementById(workSelected + '-icon')
    //   ?.classList.replace('hide', 'show');
  }

  scroll(id: string | undefined) {
    let scrollButton = document.getElementById('scroll-button');

    this.sectionIndex++;

    let element = this.sections[this.sectionIndex];

    if (id != undefined) {
      element = document.getElementById(id);
      this.sectionIndex = this.sections.indexOf(element);
      console.log(this.sections.length, this.sectionIndex);
    }

    if (this.sectionIndex < this.sections.length - 1) {
      scrollButton?.classList.replace('fa-arrow-up', 'fa-arrow-down');
    }

    // if (this.sectionIndex == this.sections.length-1)
    // { scrollButton?.classList.remove('fa-arrow-down'); scrollButton?.classList.add('fa-arrow-up'); console.log(scrollButton?.classList); }

    if (this.sectionIndex == this.sections.length - 1) {
      this.sectionIndex = 0;
      scrollButton?.classList.replace('fa-arrow-down', 'fa-arrow-up');
    }

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      document
        .getElementById('skill-details')
        ?.classList.replace('hide', 'show');
      document.getElementById('skill-icon')?.classList.replace('hide', 'show');
    }, 500);

    //to get the parent element of all containers
    for (let i = 0; i < this.containers.length; i++)
      this.sections.push(this.containers[i].parentElement);
  }
}
