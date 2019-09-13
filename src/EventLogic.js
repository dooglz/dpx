import moment from 'moment';

class EventLogic {
    static dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    static startOfWeek(date = new Date()) {
        return moment(date).startOf('isoWeek').toDate();
    }
    static getDateForID(dayId, weekOffset = 0) {
        return moment().startOf('isoWeek').add(weekOffset, 'weeks').add(dayId, 'days').toDate();
    }
    static getDayLabel(date) {
        return moment(date).format('dddd DD/MM')
    }
    static isThisCurrentDay(date) {
        const start = moment().startOf('day');
        const tomorrow = moment().startOf('day').add(1, 'days');
        return moment(date).isBetween(start, tomorrow, null, '[)');
    }

    static getSlotDuration(slices) {
        let d1 = new Date(0);
        d1.setHours(9);
        let d2 = new Date(d1);
        d2.setHours(17);
        return (d2 - d1) / slices;
    }
    static getDayStart(date) {
        return moment(date).startOf('day').set('hour', 9).toDate();
    }
    static getSlotStartTime(date, slotId, slices) {
        let a = moment(this.getDayStart(date));
        a.add(slotId * this.getSlotDuration(slices), 'ms')
        return a.toDate();
    }
    static getSlotEndTime(date, slotId, slices) {
        return moment(this.getDayStart(date)).add((slotId + 1) * this.getSlotDuration(slices), 'ms').toDate();
    }
    static getTimeLabelForMe(slotID, slices) {
        return this.getTimeForMe(slotID, slices).toISOString().slice(11, 16);
    }
    static getEventForMe(startTime, events) {
        return events.find((v, i) => v.allocated && moment(v.startTime).isSame(moment(startTime)));
    }

    /*
    static isThisPastDay(dayId, weekOffset = 0) {
        let day = new Date();
        return (day.getDay() - 1) === dayId;
    }
    static isThisFutureDay(dayId, weekOffset = 0) {
        let day = new Date();
        return (day.getDay() - 1) === dayId;
    }*/
    static getTimeForMe(slotID, slices) {
        const dd = new Date(0);
        dd.setHours(9);
        let d2 = new Date(dd);
        d2.setHours(17);
        return new Date(dd.getTime() + (slotID * ((d2 - dd)) / slices))
    }
    static getOverlappingMe(dayId, slotID, events) {
        return events.find((v, i) => v.startDay === dayId && (v.startTime <= slotID && v.startTime + v.duration >= slotID));
    }
}

export default EventLogic