;(function(global) {
    

    var TemplateRender = function() {
        return new TemplateRender.init();   
    }
    


    TemplateRender.prototype = {
        

        renderTemplate: function(template,params,selector) {

            if (!$) {
                throw 'jQuery not loaded';   
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';   
            }

            var htmlCompiled = Mustache.render($(template).html(), params);
            $(selector).html(htmlCompiled);
            return htmlCompiled;

        } ,

        loadTemplate: function(templatePath,params,selector) {
            var self = this;
            var d = $.Deferred();

            if (!$) {
                throw 'jQuery not loaded';   
            }

            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            $.get(templatePath, function(template, textStatus, jqXhr) {
                self.renderTemplate(template,params,selector);
                d.resolve(true);
            });

            return d.promise();
  
        } ,


        appendConfirmationModal: function(id) {


            if (!$) {
                throw 'jQuery not loaded';   
            }

            $( 'body' ).append( '<div id=" '+id+'" class="modal"></div>' );
  
        }                  
        

        
    };
    

    TemplateRender.init = function() {
        
        var self = this;
        
    }
    

    TemplateRender.init.prototype = TemplateRender.prototype;
    

    global.TemplateRender = global.TR$ = TemplateRender;
    
}(window));