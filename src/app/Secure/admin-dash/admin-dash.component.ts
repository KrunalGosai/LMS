import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BookAddingService } from 'src/services/book-adding.service';
import { BookDetailsService } from 'src/services/book-details.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

  constructor(private booklistingservice: BookAddingService, private bookDetailsService: BookDetailsService, private spinner: LoaderService) { }
  allBookData:any;
	allBookDetails:any
	allBookHistory:any;
  statusBasedData:any[]= [];
  categoryBasedData:any[]=[];
  sRequested = [];
	sReturned = [];
	sStock = [];
  sAvailable = [];
  sIssued = [];
  monthLabels = [];
  chart = [];
  totalBooks = 0;

  ngOnInit() {
    this.spinner.show();
    this.booklistingservice.getBookDetailForAdmin('','ase','').toPromise().then(res =>{
      this.allBookData = res.json()
      this.booklistingservice.getAllBookDetails().toPromise().then(res => {
        this.allBookDetails = res.json();
        this.loadStatusBasedData();
        this.loadCharts();
      },err=> {
        this.loadCharts();
        console.error(err)
			})
			
			//api call for load month based chart
			// this.bookDetailsService.getAvailableBooks().then(res => {
			// 	this.allBookHistory = res.json().getallissuelistdata;
			// 	console.log(this.allBookHistory);
			// 	this.loadIssuedDetails()
      // },err=>{console.error(err)})
      this.loadCategoryBasedData();
    },err=>{console.error(err)})
	}
	
  loadStatusBasedData(){
    let data = [];
    if(this.allBookDetails.bookbyid){
			this.totalBooks = this.allBookDetails.bookbyid.length;
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Requested').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Returned').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Available').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Issued').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Return Requested').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Renewed').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Renew Requested').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Renew Rejected').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Renew Approved').length);
      data.push(this.allBookDetails.bookbyid.filter(item => item.bookStatusDisplayName == 'Request Rejected').length);
    }
		this.statusBasedData = data;
		// this.loadMonthBasedData();
  }

  loadCategoryBasedData(){
    let data = [];
    if(this.allBookData.bookbyid){
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Action').length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Horror').length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Comics').length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Arts and Photography').length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == `Children's`).length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Business and Money').length);
      data.push(this.allBookData.bookbyid.filter(item => item.categoryDisplayName == 'Travel').length);
    }
    this.categoryBasedData = data;
	}
	//load month based charts 
	// loadMonthBasedData(){
	// 	let cMonth = new Date().getMonth();
  //   let month = cMonth;
  //   let cYear = new Date().getFullYear();
	// 	let year = cYear;
	// 	let total = this.allBookDetails.bookbyid.length;
	// 	var loop = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// 	this.sStock.push(total)
  //   loop.map((item, i) => {
	// 		var fData = (this.allBookDetails.bookbyid.filter(item => (new Date(item.DateCreated)).getMonth() == month && (new Date(item.DateCreated)).getFullYear() == year));
	// 		if(i<11){
	// 			total = total - fData.length;
	// 			this.sStock.push(total)
	// 		}
  //     // this.sRequested.push(fData.filter(item => item.book_Status == "Requested").length)//this need to be change with requested date;
  //     // this.sReturned.push(fData.filter(item => item.book_Status == "Returned").length)
  //     // let count = fData.filter(item => item.book_Status != "Requested" && item.book_Status != "Request Rejected").length;
  //     // this.sIssued.push(count)
  //     // this.sAvailable.push(this.totalBooks - count);
  //     this.monthLabels.push(loop[month]);
	// 		if(month == 0){
  //       month = 11;
  //       year = year - 1;
  //     }
  //     else
  //       month = month - 1;
	// 	})
	// }

	// loadIssuedDetails(){
	// 	let cMonth = new Date().getMonth();
  //   let month = cMonth;
  //   let cYear = new Date().getFullYear();
	// 	let year = cYear;
	// 	var loop = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		
  //   loop.map((item, i) => {
	// 		var fData = (this.allBookHistory.filter(item => (new Date(item.issueDate)).getMonth() == month && (new Date(item.issueDate)).getFullYear() == year));
  //     // this.sRequested.push(fData.filter(item => item.book_Status == "Requested").length)//this need to be change with requested date;
  //     // this.sReturned.push(fData.filter(item => item.book_Status == "Returned").length)
  //     let count = fData.filter(item => item.book_Status != "Requested" && item.book_Status != "Request Rejected").length;
	// 		this.sIssued.push(count)

	// 		var total = this.sStock[i] - count
	// 		this.sAvailable.push(total)
	// 		if(month == 0){
  //       month = 11;
  //       year = year - 1;
  //     }
  //     else
  //       month = month - 1;
	// 	})
	// 	this.loadMonthBasedDataChart();
	// }

	// loadMonthBasedDataChart(){
	// 	console.log(this.sStock,this.sIssued,this.sAvailable)
	// 	this.chart = new Chart('canvas3',{
  //     type: 'bar',
	// 		data: {
  //       labels: this.monthLabels.reverse(),
	// 			datasets: [{
  //         label: 'Book Stock',
	// 				backgroundColor: 'lightpink',
	// 				borderColor: 'lightpink',
	// 				data: this.sStock.reverse(),
	// 				fill: false,
	// 			},{
  //         label: 'Book Issued',
	// 				backgroundColor: 'dodgerblue',
	// 				borderColor: 'dodgerblue',
	// 				data: this.sIssued.reverse(),
	// 				fill: false,
	// 			},{
  //         label: 'Book Available',
	// 				backgroundColor: 'mediumpurple',
	// 				borderColor: 'mediumpurple',
	// 				data: this.sAvailable.reverse(),
	// 				fill: false,
	// 			}]
	// 		},
	// 		options: {
	// 			responsive: true,
	// 			title: {
	// 				display: false,
	// 			},
	// 			tooltips: {
	// 				mode: 'index',
	// 				intersect: false,
	// 			},
	// 			hover: {
	// 				mode: 'nearest',
	// 				intersect: true
	// 			},
	// 			scales: {
	// 				xAxes: [{
	// 					display: true,
	// 					scaleLabel: {
  //             display: true,
  //             labelString: 'Month'
	// 					}
	// 				}],
	// 				yAxes: [{
	// 					display: true,
	// 					scaleLabel: {
	// 						display: true,
	// 						labelString: 'Value'
	// 					}
	// 				}]
	// 			}
	// 		}
  //   });
	// }

	//load charts based on status and category.
  loadCharts(){
		this.chart = new Chart('canvas1', {
      type: 'pie',
			data: {
				datasets: [{
					data: this.categoryBasedData,
					backgroundColor: [
						'orange',
            'mediumpurple',
						'lightseagreen',
            'dodgerblue',
            'yellow',
            'hotpink',
            'darkgray'
					],
					label: 'Dataset 1'
				}],
				labels: ['Action', 'Horror', 'Comics', 'Arts&Photography', `Children's`, 'Business&Money','Travel'],
			},
			options: {
				responsive: true
			}
    });

    this.chart = new Chart('canvas2',{
      type: 'bar',
			data: {
        labels: ['Requested','Returned','Available','Issued','Return Requested','Renewed','Renew Requested','Renew Rejected',
                'Renew Approved','Request Rejected'],
				datasets: [{
          label: 'status',
					backgroundColor: 'lightseagreen',
					borderColor: 'lightseagreen',
					data: this.statusBasedData,
					fill: false,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: false,
						scaleLabel: {
              display: true,
              labelString: 'Status'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		});
    
    this.spinner.hide();
  }

}
