/*
Makes all inline forms collapsible.
*/

jQuery(function($) {
    $.makeCollapsible = function(target, item, collapsible, triggerTarget, setInitStatus, setFirstStatus)
    {
        var triggerExpand = 'Edit';
        var triggerCollapse = 'Done';
        var triggerClass = 'collapse-expand';
        var triggerLink = '<a class="' + triggerClass + '" href="javascript:void(0);"></a>';

        $(target).find(item).each(function(i) {
            if ($(this).data('isCollapsible')) return;
            $(this).data('isCollapsible', true);

            $(this).find(collapsible).hide();

            // trigger already exists if created with "Add another" link
            var trigger = $(this).find(triggerTarget).find('.'+triggerClass);
            if (!trigger.length) {
                trigger = $(triggerLink);
                $(this).find(triggerTarget).html(trigger);
            }

            var item = this;
            var toggleCollapse = function(status, speed)
            {
                if (status == null) {
                    status = !item.collapseStatus;
                }
                if (speed == null) {
                    speed = 1;
                }
                item.collapseStatus = status;
                 if (status) {
                    trigger.html(triggerCollapse);
                    $(item).find(collapsible).slideDown('slow');
                } else {
                    trigger.html(triggerExpand);
                    $(item).find(collapsible).slideUp('slow');
                }
            }

            trigger.click(function(event) {
                event.preventDefault();
                toggleCollapse(null, 'normal')
            })

            // Collapse by default unless there are errors
            initStatus = setInitStatus != null ? setInitStatus : $(this).find('.errors').length != 0;
            firstStatus = setFirstStatus != null ? setFirstStatus : initStatus;

            toggleCollapse(i == 0 ? firstStatus : initStatus)
        });
    };

    var init = function() {
        $.makeCollapsible('div.inline-group', 'div.inline-related', 'fieldset', 'h3 b');
    };
    init();
    // init again when "Add another" link is clicked
    $('.add-row a').click(function() {
        init();
    })
});
