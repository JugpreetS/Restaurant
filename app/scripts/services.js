'use strict'

angular.module('confusionApp')

  .constant('baseURL', 'http://localhost:3000/')
	.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL){
		
    this.getDishes = function(){
      return $resource(baseURL+'dishes/:id', null, {'update' : {method : 'PUT'}});
    };

    //this.getDish = function(index){
    //	return $http.get(baseURL+'dishes/'+index);
    //};

    // implement a function named getPromotion
    // that returns a selected promotion.

    this.getPromotions = function(){
      return $resource(baseURL+'promotions/:id', null, {'update' : {method : 'PUT'}});
    };
	}])

  .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    var corpfac = {};

       
    corpfac.getLeaders = function(){
      return $resource(baseURL+'leadership/:id', null, {'update' : {method : 'PUT'}});
    };

    // corpfac.getLeader = function(designation){
    //   var leaders = corpfac.getLeaders();
    //   leaders.filter(function(entry){
    //     //check to find the match for the designation
    //     if(entry.abbr == designation){
    //       return entry;
    //     }
    //   })
    //   // if a match is not found return the default value, 3 in this case.
    //   return leaders[3];
    // };

    return corpfac;
  }])

  .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){

    var feedbackFac = {};

    feedbackFac.feedback = function(){
      return $resource(baseURL+'feedback/', null, {'addFeedback' : {method : 'POST'}});
    }

    return feedbackFac;
  }])

;