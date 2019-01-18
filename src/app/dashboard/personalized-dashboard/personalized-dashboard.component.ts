import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { AppService } from 'src/app/app.service';
 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/issue.service';
import { NgForm } from '@angular/forms';
import { SocketService } from 'src/app/socket.service';
 
 
 


declare var $: any;

@Component({
  selector: 'app-personalized-dashboard',
  templateUrl: './personalized-dashboard.component.html',
  styleUrls: ['./personalized-dashboard.component.css'],
  providers:[ ]
})
export class PersonalizedDashboardComponent implements OnInit {

  @ViewChild('dataTable') table: { nativeElement: any; };
  dataTable:any;
  dtOptions:any; 

  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public allAssignedIssue: any;
   
  public list=[];
  public disconnectedSocket:boolean;
  q:string;
  res: any;
  allIssueDetails:any;
  assigneeId:any;
  newList: any[];

  constructor(public appSevice:AppService,
    public socketService:SocketService,
    public issueService:IssueService,
    public router:Router,
    private toastr:ToastrService) { 
      console.log('dashboard constructor');
      this.receiverId = Cookie.get('receiverId');
      this.receiverName = Cookie.get('receiverName');
    }

    submitSearch(){
        
        console.log(this.q);
        let query = this.q;
        
        if(query){
          this.router.navigate(['/search',{q:query}]);
        }
        
    }

    getIssue(issueId){
      console.log(issueId);
     // this.router.navigate([`/issue-view`,newList.issueId]);
    }

  ngOnInit() {
    this.dtOptions = {
        "paging":   true,
        "ordering": true,
        "info":     false,
        "searching": false,
        "bPaginate": false,
        "bLengthChange": false,
        
    };
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable(this.dtOptions);

    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appSevice.getUserInfoFromLocalStorage();
    console.log(this.userInfo);
    //this.checkStatus();
    this.verifyUserConfirmation();
    console.log('inside dashboard oninit');
    
    
     this.getAllIssues();
    //this.getUserInfo();
  }


  public getAllIssues = ()=>{
      
    this.issueService.getAllIssues().subscribe(response=>{
      console.log(response);
      this.allIssueDetails = response.data;
       
       for(let x in this.allIssueDetails){
          this.assigneeId = this.allIssueDetails[x].assigneeId;
          if(this.receiverId === this.assigneeId){
             if(this.allIssueDetails[x].length < 0){
                 continue;
             }else{
               this.list[x]=this.allIssueDetails[x];
             }
          }
       } 
       this.newList = this.list.filter(value => Object.keys(value).length !== 0)
       console.log(this.newList);
     
      
    },err=> {console.log(err)});
      
    
 }

  

    

   /* public getUserInfo = () => {
       this.authToken = Cookie.get('authToken');
       this.userInfo = this.appSevice.getUserInfoFromLocalStorage();
       this.receiverId = this.userInfo.userId;
       //this.getAssignedIssueForUser(this.receiverId);
   } */

   public checkStatus:any  = ()=>{
     if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null){
         this.router.navigate(['/']);
         return false;
     }else{
       return true;
     }

   }

   public verifyUserConfirmation:any = ()=>{
       this.socketService.verifyUser().subscribe((data)=>{
          this.disconnectedSocket = false;
          this.socketService.setUser(this.authToken);
          console.log("inside verify user");
          //this.getOnlineUserList();
       });
   } 

  public getAllAssignedIssueList:any = () =>{
         
       
       
          
        
         
         
          
     
   } 

}
