# Fighter Aircraft Status System

In this project, I had a chance to work on React, WebSocket and Electron technologies.
In the css part, I used features such as rotate, transform and position absolute.

![aircraft](https://github.com/batuhanbasturk/OBSS_FE23/assets/81568088/b5a09b83-83d2-4811-9848-1047a35ce5d0)

## App.js
I have processed the data coming from my WebSocket connection into my component's states in my backend. I added start and stop buttons to initiate and stop this data. I passed these received data as props to my components to perform the necessary operations.

## Components

### `Plane`

#### Plane SVG Layout

* Used an existing SVG element with a fixed width and height to represent the plane container.
* Implemented the rotational adjustment of the plane based on the plane_angle data received from WebSocket.

### `Speedometer`

#### Speedometer SVG Layout

* Used an existing SVG element with a fixed width and height to represent the speedometer and arrow container.
* Implemented the rotational adjustment of the Arrow based on the speed data received from WebSocket.

### `Battery`

#### Battery SVG Layout
* Used an existing SVG element with a fixed width and height to represent the battery container.
* Inside the SVG, added four rectangles, each one representing 25% of the battery capacity.
* The height of these rectangles is determined by the data received from the WebSocket.

#### Color Indication

* Used CSS to change the color of the rectangles based on the battery level.
* If the battery level is greater than 50%, applied a green fill color to all rectangles.
* If the battery level is between 25% and 50%, applied a yellow fill color.
* If the battery level is less than 25%, applied a red fill color.

#### Blinking Effect

* Defined a CSS animation that toggles the visibility of the SVG element to create a blinking effect.
* Triggered this animation when the battery level drops below 20%.




