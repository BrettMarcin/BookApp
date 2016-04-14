(function($) {
    $(function() {

        var BookModel = Backbone.Model.extend({
            defaults: function() {
                return{
                    title: '',
                    subtitle: '',
                    url: '',
                    number_of_pages: ''
                }
            },
            urlRoot: 'find'
        });

        var BooksCollection = Backbone.Collection.extend({
            model: BookModel
        });

        var BookRowView = Backbone.View.extend({
            tagName: 'tr',

            template: _.template($('#book-template').html()),

            render: function() {
                this.$el.html(this.template(this.model.attributes));
                return this;
            }
        });

        var BooksTableView = Backbone.View.extend({
            el: '#table-body',

            initialize: function() {
                this.listenTo(this.collection, 'reset', this.render);
            },

            render: function() {
                this.$el.html('');

                this.collection.each(function(model) {
                    var bookRowView = new BookRowView({
                        model: model
                    });

                    this.$el.append(bookRowView.render().el);
                }.bind(this));

                return this;
            }
        });

        var booksCollection = new BooksCollection();
        var booksTableView = new BooksTableView({collection: booksCollection});

        $('#book-search-form').on('submit', function() {
            var bookIds = $('#search-text').val();

            $.ajax('/find/' + bookIds.replace(/\s+/g, ''))
                .done(function(data) {
                    booksTableView.collection.reset(data);
                });

            return false;
        });

    });

})(jQuery);
