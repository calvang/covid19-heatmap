import React, { Component } from 'react';
import { grey, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

export default class Slides extends Component{
  constructor(props) {
    super(props);
    this.setState({
      open: true
    })
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.state.name !== nextProps.name;
  // }

  render() {
    return (
      <AutoRotatingCarousel
        label="Open Maps"
        open={this.props.handleOpen}
        onClose={() => this.props.setHandleOpen({ open: false })}
        onStart={() => this.props.setHandleOpen({ open: false })}
        autoplay={true}
        mobile={this.props.isMobile}
        style={{ position: "absolute" }}
      >
        <Slide
          media={
            <div><i className="fa fa-map-o w3-xxxlarge"></i>
            <p>Place heatmap here</p></div>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[200] }}
          style={{ backgroundColor: blue[900] }}
          title="Monitor the Spread"
          subtitle="Stay alert about cases of Covid-19 around the world with a gradiented heatmap."
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" alt="img3"/>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[200] }}
          style={{ backgroundColor: green[900] }}
          title="Stay Safe"
          subtitle="Stay vigilant with timeline map of projected cases in the coming months."
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" alt="img2"/>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[200] }}
          style={{ backgroundColor: grey[800] }}
          title="Get Access to Resource"
          subtitle="Get quick access to local Covid-19 resources in your area."
        />
      </AutoRotatingCarousel>
    );
  }
}