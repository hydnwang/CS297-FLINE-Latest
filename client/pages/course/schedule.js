import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Paper, Typography } from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';
import { Scheduler, WeekView,Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import querystring from 'querystring';
import { withAuthSync } from '../../utils/auth';
const fetch = require("node-fetch");
import appointments from './appointments'

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

const parseTime=function(data){
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
        day = 25;
      }else if(group[0]=="Tu"){
        day = 26;
      }else if(group[0]=="W"){
        day = 27;
      }else if(group[0]=="Th"){
        day = 28;
      }else if(group[0]=="F"){
        day = 29;
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
      json.startDate=new Date(year, month, day, start_hour, start_min);
      json.endDate=new Date(year, month, day, end_hour, end_min);
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
    };
  }
  componentWillMount() {
    var u_id = 0;
    if(this.props.token!=undefined){
      u_id =this.props.token;
    }
    const params={
      user_id:u_id
    };
    const url = 'http://localhost:3000/api/schedule?'+ querystring.stringify(params);
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({data:parseTime(data)}) ;
      })
      .catch(e => console.log('错误:', e));
    console.log("course_data:"+this.state.data);
  };

  render()
  {
    const { data, currentDate } = this.state;
    return (
      <Layout title="Schedule">
        <Container maxWidth="12" style={{ flex: 1 }}>
          <h1>Schedule</h1>
          <Scheduler
          data = {data}
          >
            <ViewState
              currentDate={currentDate}
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