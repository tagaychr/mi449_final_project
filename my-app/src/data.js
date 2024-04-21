import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';
const supabaseUrl = 'https://yryrzmcfkwklywykoevq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeXJ6bWNma3drbHl3eWtvZXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3MjMxOTUsImV4cCI6MjAyNjI5OTE5NX0.EUo0LxitPyAIL60ZWgNl4J69gSYsQCTXq-U5yrvoBbQ'
const supabase = createClient(supabaseUrl, supabaseKey)


console.log("here");

let { data: books, } = await supabase
  .from('books')
  .select('*')


  for (let book of books) {
    //console.log(book)

    // const booksTableBody = document.getElementById('booksTableBody');
    // const row = document.createElement('tr');
    //         row.innerHTML = `
    //             <td>${book.title}</td>
    //             <td>${book.author}</td>
    //             <td>${book.isbn}</td>
    //         `;
    //         booksTableBody.appendChild(row);
        
    //let bookList = document.getElementById('books');
    //bookList.innerHTML += `<li>${book.title} ${book.author} ${book.isbn}</li>`;
}