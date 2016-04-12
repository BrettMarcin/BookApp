
var book = Backbone.Model.extend({
    default: {
        ISBN: '',
        title: '',
        subtitle: '',
        url: '',
        number_of_pages: ''
    },
    urlRoot: 'find'
});



var books = Backbone.Collection.extend({

    model: book

});




var booksView = Backbone.View.extend({

    render: function(){
        if(document.getElementById("myForm") === book.get('ISBN'))
        {

            var self = this;
            $('#tr');

            _.each(this.collection.models, function(book) {
                self.renderBook();
            }, this);

        }else{
            alert("Invalid number, please try again!");
        }
    },

    renderBook: function(book){
        var newbook = app.views.book({
            model: book
        });
        $('#tr').append(newbook.render().el);

    }

});


function loadDoc(e) {
    e.preventDefault();

    var userInput = $('#search').val();

    var newBook = new book({
        id: userInput
    });

    newBook.fetch({

        success: function(data){
            console.log(data);
            $('#book1-title').html(data.get('title'));
            $('#book1-subtitle').html(data.get('subtitle'));
            $('#book1-url').html(data.get('url'));
            $('#book1-pages').html(data.get('number_of_pages'));
        }
    });




    return false;
}











