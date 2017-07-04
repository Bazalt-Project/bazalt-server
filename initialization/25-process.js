'use strict';

// Clean exit
process.on('SIGINT', function() {
    
    setTimeout(function() {
        process.exit();
    }, 1000);
});
