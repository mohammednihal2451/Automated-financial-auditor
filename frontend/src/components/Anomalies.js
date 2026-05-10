function Anomalies() {
  return (
    <div className="card p-3 mt-3">
      <h5>Recent Anomalies</h5>

      <div className="mt-3">

        <div className="border p-2 mb-2">
          <strong>#TR-9821</strong> - Large Transaction  
          <span className="text-danger"> (High Risk)</span>
          <br />
          <button className="btn btn-sm btn-primary mt-2 me-2">
            Investigate
          </button>
          <button className="btn btn-sm btn-secondary">
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}

export default Anomalies;