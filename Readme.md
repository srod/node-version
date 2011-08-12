
# Node-version
      
  A quick module that returns current node version.

  See server.js in examples/

## Installation

    npm install node-version

## Quick Start

    var nodeVersion = new (require('node-version').version);
    var currentVersion = nodeVersion.getVersion();

    /*
    console.log(currentVersion);

    {
    	original: 'v0.4.10', // same as process.version
  		short: '0.4',
  		long: '0.4.10',
  		major: '0',
  		minor: '4',
  		build: '10'
  	}
    */