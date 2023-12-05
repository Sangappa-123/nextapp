import ContentListComponent from "./ContentListComponent/ContentListComponent";
import ServiceRequestsComponent from "./ServiceRequestsComponent/ServiceRequestsComponent";

function AdjusterPropertyClaimDetailComponent() {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
        <ServiceRequestsComponent />
      </div>
      <div className="col-lg-12 col-md-12 col-12">
        <ContentListComponent />
      </div>
    </div>
  );
}
export default AdjusterPropertyClaimDetailComponent;
