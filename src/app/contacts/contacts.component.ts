import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolBarComponent } from './tool-bar/tool-bar.component'
import { ContactsService } from '../services/contacts.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @ViewChild(ToolBarComponent, { static: false }) toolBar: ToolBarComponent;
  data;
  next;
  prev;
  currentPage;
  isLoaded = false;
  contacts;
  currentCont;
  constructor(
    public contactsService: ContactsService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getContacts(1)
  }
  // [#] controllers
  // [?] open contacts modal
  openCreateNewContactModal(){
    this.toolBar.openModal()
    this.toolBar.switchMoods('create')
  }
  // [?] switch page number to an array 
  pagesArr(n: number): any[] {
    return Array(n);
  }
  // [?]
  moreData(dataID){
    this.toolBar.getContactById(dataID);
    this.toolBar.switchMoods('edit');
  }
  // [?]
  setdata(){
    this.contactsService.pages = this.data.pages;
    this.contactsService.contacts = this.data.result;
    this.contacts = this.contactsService.contacts;
    this.data.next ? this.next = this.data.next.page : this.next = null;
    this.data.previous ? this.prev = this.data.previous.page : this.prev = null;
    this.currentPage = this.data.page;
    this.toolBar.currentPage = this.data.page;
  }
  // [?] save the index num of the contact 
  currentContact(id,index){
    this.currentCont = {index:index, id:id}
  }
  // [#] HTTP REQ
  // [?] get all contacts
  getContacts(pageNum){
    this.contactsService.getContacts(pageNum).subscribe(res => {
      this.data = res
    },err=>{},()=>{
      this.setdata()
      this.isLoaded = true
    })
  }
  // [?] delete contact
  deleteContact(dataID, index){
    this.contactsService.deleteContact(dataID).subscribe(res=>{
    },err=>{},()=>{
      this.contactsService.contacts.splice(index,1)
      this.contactsService.contacts.length <= 0 ? this.getContacts(this.currentPage - 1) : this.getContacts(this.currentPage)
    })
  }
}
