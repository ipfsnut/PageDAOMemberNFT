// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let silverSupply = await store
        .getState()
        .blockchain.smartContract.methods.getSilverSupply()
        .call();
      let diamondSupply = 0;
      try {
        diamondSupply = await store
        .getState()
        .blockchain.smartContract.methods.getDiamondSupply()
        .call();
      }
      catch (err) {
        console.log(err)
      }

      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();
      console.log("silversupply:",silverSupply);
      dispatch(
        fetchDataSuccess({
          silverSupply,
          diamondSupply
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
