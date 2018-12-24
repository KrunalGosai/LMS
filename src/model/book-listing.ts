import { Data } from "@angular/router";

export interface BookListing {
    book_id?: number;
  create_date?: Date;
  book_title?: string;
  book_start?: number;  
  book_available?: boolean;
  book_withdrawBy?: string;
  book_withdrawDate?: string;
  book_releaseDate?: string;
  Book_status?: string; 
  bookStatus?: string;
  ID?:number;
  data? :Data;
}
