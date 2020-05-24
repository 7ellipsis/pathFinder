import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { getShortestPath, dijkstra } from '../algorithms/dijkstra.js';
import { dfs } from '../algorithms/dfs.js';
import { bfs, getShortestPathbfs } from '../algorithms/bfs.js';
import { astar } from '../algorithms/Astar.js';
import { bidirectionalSearch } from '../algorithms/bidirectional.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pathfinder';
  constructor(private elementRef: ElementRef) {

  }
  array: Object[] = [];
  yes: boolean = false;
  moving: boolean = false;
  iIndex = 0;
  jIndex = 0;
  startEle;
  endEle;
  beginEle;
  finishEle;
  pointers;
  start;
  end;
  initial;
  aniSpeed = 50;
  speed(x) {
    this.aniSpeed = x;
  }
  wall(e, i, j) {
    var ele = document.getElementById(e.number) as HTMLElement;
    if (ele === this.startEle || ele === this.endEle) {
      this.moving = true;
      this.pointers = ele.innerHTML;
      ele.innerHTML = '';
      if (ele === this.startEle)
        this.start = true;
      if (ele === this.endEle)
        this.end = true;
      return;
    }
    this.yes = true;
    ele.classList.add('wall');
    this.iIndex = i;
    this.jIndex = j;
    this.array[i][j].walled = true;
  }
  move(e, i, j) {
    if (this.yes == true) {
      var ele = document.getElementById(e.number) as HTMLElement;
      if (ele == this.startEle || ele == this.endEle)
        return false;
      ele.classList.add('wall');
      this.iIndex = i;
      this.jIndex = j;
      this.array[i][j].walled = true;
    }
  }
  out() {
    this.yes = false;
  }
  drop(i, j) {
    if (this.moving) {
      var ele = document.getElementById(i * 25 + j) as HTMLElement;
      ele.setAttribute('style', '');
      ele.innerHTML = this.pointers;
      this.moving = false;
      if (this.start) {
        this.startEle = ele;
        this.beginEle = this.array[i][j];
        this.start = false;
      }
      if (this.end) {
        this.endEle = ele;
        this.finishEle = this.array[i][j];
        this.end = false;
      }
      this.removeClass();
    }
  }
  removeClass() {
    var ele = document.getElementsByClassName('box');
    for (let i = 0; i < ele.length; i++) {
      ele[i].classList.remove("node-visited");
      ele[i].classList.remove("node-shortest-path");

    }
  }
  reset() {
    window.location.reload();
  }
  ///////////////////////////////////animations
  animateVisit(visited, shortest) {
    let overlay = document.querySelector('.clicks') as HTMLElement;
    overlay.style.pointerEvents = 'none';
    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length) {
        setTimeout(() => {
          this.animateShort(shortest);
        }, this.aniSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visited[i];
        document.querySelector("." + '_' + (node.row * 25 + node.col)).classList.add('node-visited');
      }, this.aniSpeed * i);
      if (i === visited.length) {
        setTimeout(() => {
          const node = visited[i - 1];
        }, this.aniSpeed * visited.length);
      }
    }
  }
  animateShort(shortest) {
    for (let i = 0; i < shortest.length; i++) {
      setTimeout(() => {
        const node = shortest[i];
        document.querySelector("." + '_' + (node.row * 25 + node.col)).classList.add('node-shortest-path');
      }, this.aniSpeed * i);
    }
    setTimeout(() => {
      let overlay = document.querySelector('.clicks') as HTMLElement;
      overlay.setAttribute('style', '');
    }, 50)
  }
  animateVisitunweighted(visited) {
    let overlay = document.querySelector('.clicks') as HTMLElement;
    overlay.style.pointerEvents = 'none';
    if (visited[visited.length - 1] !== this.endEle) {
      let overlay = document.querySelector('.clicks') as HTMLElement;
      overlay.setAttribute('style', '');
    }
    for (let i = 0; i <= visited.length; i++) {
      if (i === visited.length && visited[i - 1] === this.finishEle) {
        setTimeout(() => {
          this.animateShort(visited);
          let overlay = document.querySelector('.clicks') as HTMLElement;
          overlay.setAttribute('style', '');
        }, this.aniSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visited[i];
        document.querySelector("." + '_' + (node.row * 25 + node.col)).classList.add('node-visited');
      }, this.aniSpeed * i);
    }
  }
  /////////////////////////////////////////////////
  //////////////////////////////////////////////////
  dijkstraPath() {
    this.removeClass()
    this.resetArray()
    const visited = dijkstra(this.array, this.beginEle, this.finishEle);
    const shortest = getShortestPath(this.finishEle);
    document.getElementById("algo").innerHTML = "Dijkstra's Algorithm"
    document.getElementById("visit").innerHTML = "Visited Elements: " + visited.length;
    document.getElementById("length").innerHTML = "Path Length: " + shortest.length;
    this.animateVisit(visited, shortest);
  }
  //////////////////////////////////////////////////
  dfsPath() {
    this.removeClass()
    this.resetArray()
    let visited = dfs(this.array, this.beginEle, this.finishEle);
    document.getElementById("algo").innerHTML = "DFS Algorithm"
    document.getElementById("visit").innerHTML = "Visited Elements: " + visited.length;
    document.getElementById("length").innerHTML = "Path Length: " + visited.length;
    this.animateVisitunweighted(visited);
  }
  //////////////////////////////////////////////////
  bfsPath() {
    this.removeClass()
    this.resetArray()
    let visited = bfs(this.array, this.beginEle, this.finishEle);
    let shortest = getShortestPathbfs(this.finishEle);
    document.getElementById("algo").innerHTML = "BFS Algorithm"
    document.getElementById("visit").innerHTML = "Visited Elements: " + visited.length;
    document.getElementById("length").innerHTML = "Path Length: " + shortest.length;
    this.animateVisit(visited, shortest);
  }
  //////////////////////////////////////////////////
  astarPath(heuristic) {
    this.removeClass()
    this.resetArray()
    let arr = astar(this.array, this.beginEle, this.finishEle, heuristic);
    let visited = arr[0];
    let shortest = arr[1];
    document.getElementById("algo").innerHTML = "A* " + heuristic + " Algorithm"
    document.getElementById("visit").innerHTML = "Visited Elements: " + visited.length;
    document.getElementById("length").innerHTML = "Path Length: " + shortest.length;
    this.animateVisit(visited, shortest);
  }
  //////////////////////////////////////////////////
  bi()
  {
    var arr=bidirectionalSearch(this.array,this.beginEle,this.finishEle);
    let visited=arr[0];
    let shortest=arr[1];
    console.log(shortest)
    this.animateVisit(visited, shortest);
  }
  //////////////////////////////////////////////////
  resetArray() {
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 25; j++) {
        this.array[i][j].distance = Infinity;
        this.array[i][j].visited = false;
        if (this.array[i][j].walled)
          this.array[i][j].walled = true;
        else
          this.array[i][j].walled = false;
        this.array[i][j].previous = null;
        if (this.array[i][j] == this.beginEle)
          this.array[i][j].start = true;
        if (this.array[i][j] == this.finishEle)
          this.array[i][j].end = true;
      }
    }
  }
  initArray() {
    this.array = [];
    for (let i = 0; i < 50; i++) {
      let ele: number[] = [];
      this.array.push(ele);
      for (let j = 0; j < 25; j++) {
        this.array[i][j] = {
          number: i * 25 + j,
          row: i,
          col: j,
          distance: Infinity,
          visited: false,
          walled: false,
          start: false,
          end: false,
          path: false,
          previous: null
        };
        if (this.array[i][j].number == 238) {
          this.array[i][j].start = true;
          this.beginEle = this.array[i][j];
        }
        if (this.array[i][j].number == 1013) {
          this.array[i][j].end = true;
          this.finishEle = this.array[i][j];
        }
      }
    }
  }

  ngOnInit() {
    this.initArray();
  }
  ngAfterViewInit(): void {
    this.startEle = this.elementRef.nativeElement.querySelector("._238")
    this.startEle.innerHTML = '<span style="text-align:center;" class="glyphicon glyphicon-chevron-right"></span>';
    this.endEle = this.elementRef.nativeElement.querySelector("._1013")
    this.endEle.innerHTML = '<span style="text-align:center" class="glyphicon glyphicon-record"></span>';
    this.initial = document.getElementById('container')
  }
}
