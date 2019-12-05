import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Typography } from '@material-ui/core/';
import { Scheduler, WeekView,Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import querystring from 'querystring';
import { withAuthSync } from '../../utils/auth';
const fetch = require("node-fetch");

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

const getWeekDay = function(){
  const dateOfToday = Date.now();
  var currentDate = new Date(dateOfToday);
  var timesStamp = currentDate.getTime();
  var currenDay = currentDate.getDay();
  console.log("今天是："+currenDay);
  var dates = [];
  for (var i = 0; i < 7; i++) {
      dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)));
  }
  // console.log("dates:"+dates);
  return dates;
};

const parseTime=function(data){
  var dates=getWeekDay();
  var res=[];
  data.forEach(item=>{
  var slot=item.meeting_time;
  var array=slot.split(',');
  
  console.log(array);
  array.forEach(time=>{
    if(time.length>3){
      var json={title: item.course_title,
        code: item.course_id,
        type: item.course_type,
        startDate:0,
        endDate:0,
      }
      var group = time.split(" ");
      var year =2019;
      var month = 10;
      var day = 0;
      var start_hour=0;
      var start_min = 0;
      var end_hour=0;
      var end_min = 0;
      if(group[0]=="M"){
        day = dates[0].getDate();
        month = dates[0].getMonth();
        year = dates[0].getYear();
      }else if(group[0]=="Tu"){
        day = dates[1].getDate();
        month = dates[1].getMonth();
        year = dates[1].getYear();
      }else if(group[0]=="W"){
        day = dates[2].getDate();
        month = dates[2].getMonth();
        year = dates[2].getYear();
      }else if(group[0]=="Th"){
        day = dates[3].getDate();
        month = dates[3].getMonth();
        year = dates[3].getYear();
      }else if(group[0]=="F"){
        day = dates[4].getDate();
        month = dates[4].getMonth();
        year = dates[4].getYear();
      }
      var hour_slot = group[1].split(/[-:]/);
      if(group[1].charAt(group[1].length-1)=="p"){
        start_hour = parseInt(hour_slot[0])+12;
        start_min = parseInt(hour_slot[1]);
        end_hour = parseInt(hour_slot[2])+12;
        end_min = parseInt(hour_slot[3].substring(0,hour_slot[3].length-1));
      }else{
        start_hour = parseInt(hour_slot[0]);
        start_min = parseInt(hour_slot[1]);
        end_hour = parseInt(hour_slot[2]);
        end_min = parseInt(hour_slot[3]);
      }
      json.startDate=new Date(year+1900, month, day, start_hour, start_min);
      // console.log("course time:"+ json.startDate.toLocaleDateString());
      // console.log("year:"+dates[0].getYear());
      json.endDate=new Date(year+1900, month, day, end_hour, end_min);
      res.push(json);
    }
  })
});
console.log(res);
return res;
};

class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      currentDate: new Date('2019-11-27'),
      userName: ''
    };
  }

  static getInitialProps({query}) {
    return {query}
  }

  componentWillMount() {
    var u_id = this.props.query.u_id || this.props.token;
    if (u_id != undefined) {
      fetch('/api/users/' + u_id)
        .then(res => res.json())
        .then(data => {
          this.setState({userName: data[0].name}) ;
        })
    }
    const params={
      user_id:u_id
    };
    const url = '/api/schedule?'+ querystring.stringify(params);

    fetch(url)
      .then(res => res.json())
      .then(data => {
       this.setState({data:parseTime(data)}) ;
      })
      .catch(e => console.log('错误:', e));

  };

  render()
  {
    const { data, currentDate, userName } = this.state;
    return (
      <Layout title="Schedule" loginStatus={this.props.loginStatus}>
        <Container maxWidth="12" style={{ flex: 1 }}>
          <h1>{userName? (userName + "'s Schedule"): ("Schedule")}</h1>
          <Scheduler
          data = {data}
          >
            <ViewState
            />
            <WeekView
              startDayHour={8}
              endDayHour={20}
            />
            <Appointments appointmentComponent={Appointment}/>
          </Scheduler>
        </Container>
      </Layout>
    );
  }
}
export default withAuthSync(Schedule);