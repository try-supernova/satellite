# Satellite

Satellite is a simple, lightweight, and easy to use framework for interacting with the Pluto APIs and build your program. It is written in TypeScript and built with [Parcel](https://parceljs.org/). It consists of two parts: the Satellite SDK and the Satellite build tool.

Satellite SDK is a collection of libraries that allow you to interact with the Pluto APIs. It should be imported into your project.

Satellite build is a CLI tool that allows you to build your Pluto program from the command line. 

## Installation
```bash
# install the SDK locally to your project
npm i @use-pluto/satellite
## usage: import { ... } from '@use-pluto/satellite'

# install the build tool globally
npm i -g @use-pluto/satellite
## usage: satellite build
```