export default function BorrowedBooks(){
    return (
    <>
    <h1>Reserved Books</h1>
   <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>        
        <th scope="col">Book</th>
        <th scope="col">Status</th>
        <th scope="col">Reserved At</th>
        <th scope="col">Expires At</th>
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
        <td>
          <button className="btn btn-primary">Cancel Reservation</button>
        </td>
      </tr>
    </tbody>
  </table>
    </>
  );
}