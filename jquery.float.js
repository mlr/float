/*
* Float
* Makes input elements only allow float values
* Ronnie Miller (me@ronniemlr.com)
* http://ronniemlr.com/jquery/float/
*/
(function($) {
$.fn.float = function(options) {
  return this.each(function() {
    if(!$(this).is('input[type=text]')) return;

    var defaults = { precision: 2 },
        settings = $.extend({}, defaults, options);

    $(this).live('keydown', function(event) {
      control_key = (event.metaKey || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39);
      string      = $(this).val();
      decimals    = string.indexOf(".");

      // Prevent multiple decimals
      if(event.keyCode == 190 && decimals >= 0) {
        event.preventDefault();
      }

      // Prevent more than two places after the decimal
      node = $(this).get(0);
      caret = getCaret(node);
      selection = getTextSelection(node);

      if(event.keyCode == 37) caret  -= 1;
      if(event.keyCode == 39) caret  += 1;
      if(caret > string.length) caret = string.length;
      if(caret < 0) caret = 0;

      // If we didn't press a control key, the length after the decimal is >= precision, the cursor is located after the decimal, we do not have a selection
      if(!control_key && decimals >= 0 && string.substring(decimals+1).length >= settings.precision && caret > decimals && selection.length == 0) {
        event.preventDefault();
      }

      if(!control_key) {
        // Ensure key isn't a minus at start        // Ensure that it is a number, but not shift+number
        if(!(caret == 0 && event.keyCode == 189 || event.keyCode == 109) && (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))) {
          event.preventDefault();
        }
      }
    });
  });
}
})(jQuery);

// http://stackoverflow.com/a/263796
function getCaret(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = el.createTextRange(),
        rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }
  return 0;
}

// Adapted from http://stackoverflow.com/a/275825
function getTextSelection(textComponent)
{
  var textComponent;
  var selectedText;
  // IE version
  if (document.selection != undefined)
  {
    textComponent.focus();
    var sel = document.selection.createRange();
    selectedText = sel.text;
  }
  // Mozilla version
  else if (textComponent.selectionStart != undefined)
  {
    var startPos = textComponent.selectionStart;
    var endPos = textComponent.selectionEnd;
    selectedText = textComponent.value.substring(startPos, endPos)
  }
  return selectedText;
}

