import firebase from "firebase/app";
import "firebase/database";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

class Connect {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({ databaseURL: "https://smart-battery-gauge.firebaseio.com" });
    }
    this.ref = firebase.database().ref("temp/RECORDS");
  }

  getLatestData = async (length) => {
    let list = [];
    let query = this.ref.orderByChild("event_time").limitToLast(length);
    let snapshots = await query.once("value");
    snapshots.forEach((item) => {
      list.push({
        event_time: item.val().event_time,
        VOLTAGE: parseFloat(item.val().VOLTAGE),
        CURRENT: parseFloat(item.val().CURRENT),
        estSOC: parseFloat(item.val().estSOC),
        estSOH_R: parseFloat(item.val().estSOH_R),
        estSOH_C: parseFloat(item.val().estSOH_C),
      });
    });
    return list;
  };

  getVaildRange = async () => {
    let rangeList = [];
    let query = this.ref.orderByChild("event_time").limitToFirst(1);
    let snapshots = await query.once("value");
    snapshots.forEach((item) => {
      rangeList.push(item.val().event_time);
    });

    let query_2 = this.ref.orderByChild("event_time").limitToLast(1);
    let snapshots_2 = await query_2.once("value");
    snapshots_2.forEach((item) => {
      rangeList.push(item.val().event_time);
    });

    return rangeList;
  };

  getRangeData = async (startStr, endStr) => {
    let list = [];
    const start = moment(startStr),
      end = moment(endStr);
    if (moment(startStr).add(2.5, "minutes").isBefore(end)) {
      let length = Math.ceil((end.valueOf() - start.valueOf()) / 30);

      const bigRange = moment.range(start, end),
        smallRange = moment.range(start, moment(start.valueOf() + length));

      let acc = Array.from(bigRange.byRange(smallRange));

      for await (let timeItem of acc) {
        let query = this.ref
          .orderByChild("event_time")
          .startAt(timeItem.format("YYYY-MM-DD HH:mm:ss"))
          .endAt(timeItem.add(5, "seconds").format("YYYY-MM-DD HH:mm:ss"))
          .limitToFirst(1);
        let snapshots = await query.once("value");
        snapshots.forEach((item) => {
          list.push({
            event_time: item.val().event_time,
            VOLTAGE: parseFloat(item.val().VOLTAGE),
            CURRENT: parseFloat(item.val().CURRENT),
            estSOC: parseFloat(item.val().estSOC),
            estSOH_R: parseFloat(item.val().estSOH_R),
            estSOH_C: parseFloat(item.val().estSOH_C),
          });
        });
      }
    } else {
      let query = this.ref
        .orderByChild("event_time")
        .startAt(start.format("YYYY-MM-DD HH:mm:ss"))
        .endAt(end.format("YYYY-MM-DD HH:mm:ss"));
      let snapshots = await query.once("value");
      snapshots.forEach((item) => {
        list.push({
          event_time: item.val().event_time,
          VOLTAGE: parseFloat(item.val().VOLTAGE),
          CURRENT: parseFloat(item.val().CURRENT),
          estSOC: parseFloat(item.val().estSOC),
          estSOH_R: parseFloat(item.val().estSOH_R),
          estSOH_C: parseFloat(item.val().estSOH_C),
        });
      });
    }

    return list;
  };
}

export { Connect };
