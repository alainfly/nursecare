
app = angular.module('directive',[]);

// coparing 2 input password to validate the form, 
app.directive('compareTo', function compareTo() {
  return {
    require: 'ngModel',
    scope: {
      otherModelValue: '=compareTo'
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };
      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }
  };
});

 app.directive(
            "bnLogDomCreation",
            function() {
                // I bind the UI to the $scope.
                function link( $scope, element, attributes ) {
                    console.log(
                        attributes.bnLogDomCreation,
                        $scope.$index
                    );
                }
                // Return the directive configuration.
                return({
                    link: link
                });
            }
        );
 app.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if(element.attr("class") == "glyphicon glyphicon-pencil") {
                    element.removeClass("glyphicon glyphicon-pencil");
                    element.addClass(attrs.toggleClass);
                } else {
                    element.removeClass("glyphicon glyphicon-ok");
                    element.addClass("glyphicon glyphicon-pencil");
                }
            });
        }
    };
});

app.directive('ngUpdateHidden',function() {
   return {
        restrict: 'AE', //attribute or element
        scope: {},
        replace: true,
        require: 'ngModel',
        link: function ($scope, elem, attr, ngModel) {
            $scope.$watch(ngModel, function (nv) {
                elem.val(nv);
            });
            elem.change(function () { //bind the change event to hidden input
                $scope.$apply(function () {
                    ngModel.$setViewValue(  elem.val());
                });
            });
        }
    };
});