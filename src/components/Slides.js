import React, { Component } from 'react';
import { grey, blue, green, deepPurple } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import heatmap from '../images/heatmap.png';
import heatmap2 from '../images/heatmap2.png';
import heatmap3 from '../images/heatmap3.png';

export default class Slides extends Component{

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
            <img src={heatmap} style={{maxHeight:'90%', borderRadius: '5%'}} alt="img1"/>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[200] }}
          style={{ backgroundColor: blue[900] }}
          title="Monitor the Spread"
          subtitle="Stay alert about cases of Covid-19 around the world with a gradiented heatmap."
        />
        <Slide
          media={
            <img src={heatmap2} style={{maxHeight:'90%', borderRadius: '5%'}} alt="img2"/>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[200] }}
          style={{ backgroundColor: green[900] }}
          title="Stay Safe"
          subtitle="Stay vigilant with timeline map of projected cases in the coming months."
        />
        <Slide
          media={
            <img src={heatmap3} style={{maxHeight:'90%', borderRadius: '10%'}} alt="img3"/>
          }
          mediaBackgroundStyle={{ backgroundColor: grey[400] }}
          style={{ backgroundColor: deepPurple[800] }}
          title="Get Access to Resources"
          subtitle="Get quick access to local Covid-19 resources in your area."
        />
      </AutoRotatingCarousel>
    );
  }
}