
// Change the default directory
function require_once_change_dir(new_dir)
{
  require_once.directory = new_dir;
}

// Change what element starts putting required files after
function require_once_change_select(new_select)
{
  require_once.elem_sel = new_select;
}


/* ===========================================
 *    Includes Script Files only one time
 * =========================================== */
function require_once(script)
{
  if (require_once.elem_sel === undefined) { require_once.elem_sel = '#include_after_this'; }
	if (require_once.last_script === undefined) { require_once.last_script = $(require_once.elem_sel); }
	if (require_once.included_scripts === undefined) { require_once.included_scripts = []; }
  if (require_once.directory === undefined) { require_once.directory = 'js'; }


  // Remove '/' from directory if there is one
  if (require_once.directory.charAt(require_once.directory.length) == '/')
  {
    require_once.directory = require_once.directory.substring(0, (require_once.directory.length - 1));
  }

  // Remove the .js from the script if needed
  if (script.substring(script.length - 3, script.length) == '.js')
  {
    script = script.substring(0, script.length - 3);
  }


  // Insert new script (only if it is not included already)
  if (require_once.included_scripts.indexOf(script) < 0)
  {
    // Push the script into the array of included scripts
    require_once.included_scripts.push(script);

    var new_script = document.createElement('script');
    new_script.src = require_once.directory + '/' + script + '.js';
    new_script.type = 'text/javascript';

    // Insert into the HTML of the page
    $(require_once.last_script).after(new_script);

    require_once.last_script = new_script;

  }

}
