import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContactsService } from '../../services/contacts.service'

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private contactService: ContactsService) { }
  selectedContact;
  mood;
  currentPage;
  data
  @ViewChild('fullNameInp') fullNameInp: ElementRef
  @ViewChild('phoneNumberInp') phoneNumberInp: ElementRef
  @ViewChild('addressInp') addressInp: ElementRef
  @ViewChild('notesInp') notesInp: ElementRef
  ngOnInit(): void {
  }
  // [?] click the modal button
  openModal(){
    document.getElementById('createNewUser').click()
  }
  // [?] clear inputs data
  refreshInps(){
    this.fullNameInp.nativeElement.value = ''
    this.phoneNumberInp.nativeElement.value = ''
    this.addressInp.nativeElement.value = ''
    this.notesInp.nativeElement.value = ''
  }
  // [?] contacts data
  contactData(fullN, phoneNum, address, notes){
    return{
      Full_name: fullN,
      Phone_number: phoneNum,
      Address: address,
      Notes: notes
    }
  }
  // [?] switch mood (Create Mood | Edit Mood)
  switchMoods(mood){
    this.mood = mood
  }
  //[#] HTTP REQ
  getContacts(pageNum){
    this.contactService.getContacts(pageNum).subscribe(res => {
      this.data = res
    },err=>{},()=>{
        this.contactService.contacts = this.data.result
        this.contactService.pages = this.data.pages
    })
  }
  //[?] Post contacts
  postContact(fullN, phoneNum, address, notes){
    let newContact = this.contactData(fullN, phoneNum, address, notes)
    this.contactService.createContact(newContact).subscribe(res=>{
      this.contactService.contacts.push(res)
    },err=>{},()=>{
        this.refreshInps()
        this.contactService.contacts.length > 5 ? this.getContacts(this.contactService.pages) : this.getContacts(this.currentPage)
    })
  }
  // [?] get Selected contact
  getContactById(dataID){
    this.selectedContact = null //refresh selected Contact
    this.contactService.getSelectedContact(dataID).subscribe(res=>{
      this.selectedContact = res
    },err => { }, () => { this.openModal()})
  }
  // [?]update selected contact
  updateContact(dataID, fullN, phoneNum, address, notes){
    this.contactService.updateContact(dataID, this.contactData(fullN, phoneNum, address, notes)).subscribe(res=>{
    }, err => { }, () => {
      this.refreshInps()
      this.contactService.getSelectedContact(dataID).subscribe(res=>{
        for (let contact of this.contactService.contacts) {
          let index = this.contactService.contacts.indexOf(contact)
          dataID === contact._id ? this.contactService.contacts[index] = res : false
        }
      })
    })
  }
}
