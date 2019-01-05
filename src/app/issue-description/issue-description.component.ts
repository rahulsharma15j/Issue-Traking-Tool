import { Component, OnInit,ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.css']
})
export class IssueDescriptionComponent implements OnInit {
  editedText:string = "<b>edited text</b>";
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    let editor = this.ckEditor.instance;
    editor.config.height = '400';
    editor.config.toolbarGroups = [
      {name:'document',groups:['mode','document','doctools']},
      {name:'clipboard',groups:['clipboard','undo']},
      {name:'editing',groups:['find','selection','spellchecker','editing']},
      {name:'paragraph',groups:['list','indent','blocks','align','bidi','paragraph']},
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
      { name: 'links', groups: [ 'links' ] },
      { name: 'styles', groups: [ 'styles' ] },
      { name: 'colors', groups: [ 'colors' ] }
    ]; 
    editor.config.removeButtons = `Anchor,Save,Find,Replace,Scayt,SelectAll,Form,Radio`;
  }

}
