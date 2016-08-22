(function(global) {

'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var tr = TemplateRender();
		var companyToDelete;
		var data;
		var confirmationModalId = 'modal-confirmation';


		tr.appendConfirmationModal(confirmationModalId);

		var refreshCompaniesList = function (){
			tr.loadTemplate('/templates/card-company.html',data,'#companies-list-section');
		}

		window.deleteCompany = function(id){
			console.log('deleteCompany-->',id);
			var elementToDelete = $.grep(data.companies, function(e){ return e.id == id; });
			companyToDelete = elementToDelete[0]; 
			var promise = tr.loadTemplate('/templates/confirmation.html',companyToDelete,'#'+confirmationModalId);
			promise.done(function(c){
                $('#modal-confirmation').openModal();
            });
			
		}

		window.modalConfirmation = {
			agree : function(){
				console.log('deleting-->',companyToDelete);
				data.companies = jQuery.grep(data.companies, function(value) {
				  return value.id != companyToDelete.id;
				});
				refreshCompaniesList();
				$('#'+confirmationModalId).closeModal();
			},
			cancel : function(){
				$('#'+confirmationModalId).closeModal();
			}
		}

	    $.getJSON('/data/listing.json', {}, function(response, textStatus, jqXHr) {

	        data = {
	        	companies : response
	        };

	        refreshCompaniesList();
	    });

	});


}(window));
