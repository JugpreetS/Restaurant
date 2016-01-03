'use strict';

var app= angular.module('confusionApp');

app.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.dishes={};
    $scope.showMenu = false;
    $scope.message = "Loading..."

    // menuFactory.getDishes()
    //     .then(
    //         function(response){
    //             $scope.dishes = response.data;
    //             $scope.showMenu = true;
    //         },
    //         function(response){
    //             $scope.message = "Error: "+response.status + " " + response.statusText;
    //         }

    //     );

    menuFactory.getDishes().query(
        function(response){
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response){
            $scope.message = "Error: "+response.status+" "+response.statusText;
        }
    );
                
    $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
            $scope.filtText = "mains";
        }
        else if (setTab === 4) {
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}]);

app.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
                
}]);

app.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
    
    $scope.sendFeedback = function() {
        
        console.log($scope.feedback);
        
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;

            //save the feedback on the server.
            //feedbackFactory.feedback().addFeedback($scope.feedback);


            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            $scope.feedback.mychannel="";
            $scope.feedbackForm.$setPristine();
        }

    };
}]);

app.controller('dishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading...";
    // menuFactory.getDish(parseInt($stateParams.id, 10))
    //     .then(
    //         function(response){
    //             $scope.dish = response.data;
    //             $scope.showDish = true;
    //         },

    //         function(response){
    //             $scope.message = "Error: "+response.status+" "+response.statusText;
    //         }
    //     );

    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
    .$promise.then(
        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response){
            $scope.message = "Error: "+response.status+" "+response.statusText;
        }
    );
    
}]);

app.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
    
    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.comment = {
      author : "",
      rating : 5,
      comment : "",
      date : ""
    };
    
    $scope.submitComment = function () {
        
        //Step 2: This is how you record the date
        $scope.comment.date = new Date().toISOString();
        
        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.comment);

        menuFactory.getDishes().update({id : $scope.dish.id}, $scope.dish);
        
        //Step 4: reset your form to pristine
        $scope.dishCommentForm.$setPristine();
        
        //Step 5: reset your JavaScript object that holds your comment
        $scope.comment = {
          name : "",
          rating : 5,
          comments : ""
        };
    };
}]);

//implement the IndexController
app.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
    $scope.featuredDish = {};
    $scope.showDish = false;
    $scope.message = "Loading...";
    $scope.showPromotion = false;
    $scope.promoMessage = "Loading..."
    $scope.showLeadership = false;
    $scope.leadershipMessage = "Loading...";
    // menuFactory.getDish(0)
    //     .then(
    //         function(response){
    //             $scope.featuredDish = response.data;
    //             $scope.showDish = true;
    //         },
    //         function(response){
    //             $scope.message = "Error: "+response.status+" "+response.statusText;
    //         }
    //     );

    $scope.featuredDish = menuFactory.getDishes().get({id:0})
        .$promise.then(
            function(response){
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function(response){
                $scope.message = "Error: "+$scope.status+" "+$scope.statusText;
           }
        );

    $scope.promotion = menuFactory.getPromotions().get({id : 0})
        .$promise.then(
            function(response){
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function(response){
                $scope.promoMessage = "Error: "+response.status+" "+response.statusText;
            }
        )

    //not hardcoding the Executive chef, instead passing the EC designation
    //$scope.execChef = corporateFactory.getLeader("EC");
    $scope.execChef = corporateFactory.getLeaders().get({id : 3})
        .$promise.then(
            function(response){
                $scope.execChef = response;
                $scope.showLeadership = true;
            },
            function(response){
                $scope.leadershipMessage = "Error: "+response.status+" "+response.statusText;
            }
        )
}]);

//implement the AboutController
app.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
    $scope.leadershipMessage = "Loading...";
    $scope.showLeadership = false;

    $scope.leaders = corporateFactory.getLeaders().query(
        function(response){
            $scope.leaders = response;
            $scope.showLeadership =true;
        },
        function(response){
            $scope.leadershipMessage = "Error: "+response.status+" "+response.statusText;
        }
    );
}]);