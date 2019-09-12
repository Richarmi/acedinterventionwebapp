(function() {
  'use strict';

  angular
    .module('prototype2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
