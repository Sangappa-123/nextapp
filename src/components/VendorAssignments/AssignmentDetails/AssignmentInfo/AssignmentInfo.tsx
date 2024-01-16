import assignmentDetailsStyle from "../assignmentDetails.module.scss";
import Cards from "@/components/common/Cards/index";

const AssignmentInfo: React.FC = () => {
  return (
    <>
      <Cards className={assignmentDetailsStyle.snapShotcardContainer}>
        <div className={assignmentDetailsStyle.contentContainer}>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Status
            </label>
            <div className="col-md-3 col-sm-3 col-6">Valued</div>
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Assignment Rating
            </label>
            <div className="col-md-3 col-sm-3 col-6">11</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Vendor Name
            </label>
            <div className="col-md-3 col-sm-3 col-6">Artigem Contents</div>

            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Tax %:
            </label>
            <div className="col-md-3 col-sm-3 col-6">10.00%</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Contracted Claim Time
            </label>
            <div className="col-md-3 col-sm-3 col-6">6 days</div>

            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Address
            </label>
            <div className="col-md-3 col-sm-3 col-6">
              15 N 1st, St #100, Belleville, 62220
            </div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Date Assigned
            </label>
            <div className="col-md-3 col-sm-3 col-6">01/11/2024 11:56 AM</div>
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              End Date:
            </label>
            <div className="col-md-3 col-sm-3 col-6">01/11/2024 12:10 PM</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              First Touch
            </label>
            <div className="col-md-3 col-sm-3 col-6">01/11/2024 12:07 PM (10mins)</div>
            <label
              className={`col-md-3 col-sm-3 col-6 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Time Elapsed
            </label>
            <div className="col-md-3 col-sm-3 col-6">26mins</div>
          </div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          ></div>
          <div
            className={`col-md-12 col-sm-12 col-12 ${assignmentDetailsStyle.fieldRowContainer}`}
          >
            <label
              className={`col-md-3 col-sm-3 col-6 ps-1 ${assignmentDetailsStyle.fieldLabel}`}
            >
              Service Requested
            </label>
            <div className="col-md-3 col-sm-3 col-6">Quote With Contact </div>
          </div>
          <div className={assignmentDetailsStyle.contentCardsContainer}>
            <div className="mt-2">
              <Cards className={assignmentDetailsStyle.snapShotContentCard}>
                <div className={assignmentDetailsStyle.cardItemContainer}>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>3</span>
                  </div>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>
                      #Items Assigned
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={assignmentDetailsStyle.snapShotContentCard}>
                <div className={assignmentDetailsStyle.cardItemContainer}>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>5</span>
                  </div>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>
                      #Items Processed
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={assignmentDetailsStyle.snapShotContentCard}>
                <div className={assignmentDetailsStyle.cardItemContainer}>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>$0.00</span>
                  </div>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>
                      Total Quote
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
            <div className="mt-2">
              <Cards className={assignmentDetailsStyle.snapShotContentCard}>
                <div className={assignmentDetailsStyle.cardItemContainer}>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>$0.00</span>
                  </div>
                  <div>
                    <span className={assignmentDetailsStyle.numericContent}>
                      Total Invoice
                    </span>
                  </div>
                </div>
              </Cards>
            </div>
          </div>
        </div>
      </Cards>
    </>
  );
};
export default AssignmentInfo;
