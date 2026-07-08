export default function BorrowedBooks(){
    return (
    <>
    <h1>Borrowed Books</h1>
   <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>        
        <th scope="col">Book</th>
        <th scope="col">Status</th>
        <th scope="col">Borrowed At</th>
        <th scope="col">Due Date</th>
        <th scope="col">Return Date Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>
          <button className="btn btn-primary">Return Book</button>
        </td>
      </tr>
    </tbody>
  </table>
    </>
  );
}