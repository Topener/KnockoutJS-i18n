var topener = topener || {};

topener.i18n = function(){
    var self = this;
    
    this.language = ko.observable('en');
    
    this.langVars = ko.computed(function(){
        var r = {};
        if (topener.lang[self.language()]){
            r = topener.lang[self.language()];
        } else {
            r = topener.lang.en;
        }
        return r;
    })
    
    this.vars = {};
    
    this.get = function(name, vars){
        
        var vars = vars || false;
        
        if (!vars){
            return simpleComputed(name);
        } else {
            return varsComputed(name, vars);
        }
    
    }
    
    var varsComputed = function(name, vars){
        
        self.vars[name] = ko.computed(function(){

            if (!name){
                return '';
            }
            
            if (!self.langVars()[name]){
                return 'var "' + name + '" not found';
            }
            
            var string = self.langVars()[name];
            
            
            for (key in vars){
                string = string.replace('%'+key+'%', vars[key]);
            }
            
            return string;
            
        });
        
        return self.vars[name];
        
    }
    
    var simpleComputed = function(name){
    
        if (self.vars[name]){
            return self.vars[name];
        }
        
        self.vars[name] = ko.computed(function(){
            
            if (!name){
                return '';
            }
            
            if (!self.langVars()[name]){
                return 'var "' + name + '" not found';
            }
            
            return self.langVars()[name];
            
        });
        
        return self.vars[name];    
    }
    
    
}