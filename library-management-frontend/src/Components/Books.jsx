export default function Books() {
  return (
    <>
    <h1>Books</h1>
   <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Genre</th>
        <th scope="col">Publisher</th>
        <th scope="col">Edition</th>
        <th scope="col">Available Copies</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>
          <button className="btn btn-primary">Borrow Book</button>
        </td>
      </tr>
    </tbody>
  </table>
    </>
  );
}
