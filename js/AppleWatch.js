export default class AppleWatch {
    constructor(city) {
        this.render();
        if (city) {
            this.city = city;
            this.init();
        }
    }
    getTimezone(city) {
         switch (city) {
            case 'cupertino':
                return "America/Los_Angeles";
            case 'new-york-city':
                return "America/New_York";
            case 'london':
                return "Europe/London";
            case 'amsterdam':
                return "Europe/Amsterdam";
            case 'tokyo':
                return"Asia/Tokyo";
            case 'hong-kong':
                return "Asia/Hong_Kong";
            case 'sydney':
                return "Australia/Sydney";
            default:
                return undefined
        }
    }
    setTimezone(city) {
        clearInterval(this.interval);
        this.city = city;
        this.init()
    }
    changeWatchFaceBackground(location) {
        const watchFace = document.getElementById('watch-face');
        watchFace.className = '';
        watchFace.classList.add(location);
    }
    returnCurrentDate() {
        const today = new Date();
        return today.toLocaleString('en-US', {
            timeZone: this.getTimezone(this.city),
            day: '2-digit', month: '2-digit', year:	"numeric"
        })
    }
    returnCurrentTime() {
        const today = new Date();
        return today.toLocaleString('en-US', {
            timeZone: this.getTimezone(this.city),
            hour: '2-digit', minute: '2-digit', second:	"2-digit", hour12: true
        })
    }
    updateActiveLocation(location) {
        document.querySelector('#active-location').innerHTML = location.replace(/-/g, ' ');
    }
    updateCurrentTime(time) {
        const formattedTime = time.split(' ');
        document.querySelector('#current-time').innerHTML = `${formattedTime[0]} <span>${formattedTime[1]}</span>`;
    }
    updateCurrentDate(date) {
        document.querySelector('#current-date').innerHTML = date;
    }
    render() {
        const watchContainer = document.getElementById('watch');
        
        const watchFace = document.createElement('div');
        watchFace.id = 'watch-face';
        
        const activeLocation = document.createElement('div');
        activeLocation.id = 'active-location';
        
        const currentTime = document.createElement('div');
        currentTime.id = 'current-time';
        
        const currentDate = document.createElement('div');
        currentDate.id = 'current-date';
        
        watchFace.append(activeLocation, currentTime, currentDate);
        watchContainer.append(watchFace);
    }
    init() {
        const _this = this;
        this.updateActiveLocation(this.city)
        this.changeWatchFaceBackground(this.city)
        this.updateCurrentTime(this.returnCurrentTime());
        this.updateCurrentDate(this.returnCurrentDate());
        // interval that starts the clock
        this.interval = setInterval(function () {
            _this.updateCurrentTime(_this.returnCurrentTime());
            _this.updateCurrentDate(_this.returnCurrentDate());
        }, 1000)
    }
}