[![Latest Stable Version](https://img.shields.io/packagist/v/cubear/cwd_project.svg?style=flat-square)](https://packagist.org/packages/cubear/cwd_project)

Starter Child Theme for CD Projects
===================================

See also: [CD Demo](https://github.com/CU-CommunityApps/cd-demo) - a Drupal starter-kit and demo site.

Usage
-------

### Create a child theme from cwd_project

1. Grab a copy of this "cwd\_project" folder from the [GitHub repo](https://github.com/CU-CommunityApps/cwd_project).
    * If your site is a fresh clone of CD Demo, you'll already have cwd_project in `web/themes/custom`.

2. Rename this copy to suit your project. This will effectively be the machine name for your theme (e.g., The College of Ursine Studies at Cornell might be named **cwd\_ursine**.). For consistency, we usually name our folders and files "cwd\_xxxx".
	* CWD is the legacy name for the web development unit of Custom Development. While it's deprecated now, it's still used in many places, and three letters are more distinctive than two. So for now, I recommend just going with it! 😛

3. There are a few files in the starter theme that will also need their filenames updated to match:
	* cwd_project.info.yml &#8594; **cwd\_ursine**.info.yml
	* cwd_project.libraries.yml &#8594; **cwd\_ursine**.libraries.yml
	* cwd_project.theme &#8594; **cwd\_ursine**.theme
	
		* CSS and JavaScript assets should be renamed too, but don't need to match the theme's machine name. Simplifying to **ursine.css** would be fine, for example.
		
		* The starter `project.scss` and `project.css` files are empty (except for some breakpoint recommendations in comments). The starter `project.js` is also empty, except for Drupal-specific search code that we commonly need on every project (but also commonly customized). 

4. The "project" machine name must also be updated in the contents of the newly renamed **cwd\_ursine.info.yml**. These instances are marked with a `@CUSTOMIZE` comment for extra clarity. For example, in the libraries section:

	* `- 'cwd_project/global-styling' # @CUSTOMIZE` <nobr>**(line 25)**</nobr>

5. Also in **cwd\_ursine.info.yml**, the front-facing "CWD Starter Theme" name should be set appropriately. <nobr>**(line 5)**</nobr>

	* Optionally, you can also uncomment the libraries reference to custom CKEditor styles. <nobr>**(lines 27 & 28)**</nobr>
	
	* CKEditor styles are already inherited from the Base Theme, so you should only uncomment these two lines if project-specific styles are needed, and they would not be appropriate to add to the Base Theme itself. If you use custom CKEditor styles, you'll need to add a copy of the `css/ckeditor` folder from the Base Theme to your child theme for modification, and update the `templates/ckeditor_templates.js` file as needed.

6. In **cwd\_ursine.libraries.yml**, the references to filenames for CSS and JavaScript assets (named in step 3 above) should be updated. This is also where you will add any additional custom assets for your project.

7. There is also a `screenshot.png` file in the theme which is used in the Drupal CMS. Ask a designer for help updating this!

	* If you want it to match the Base Theme, the typography is done in Avenir Next Medium.

8. Remove composer.json from your new theme (no need to keep it).

### Drupal
After you create your child theme and commit it to your site repo:
1. Go to /admin/appearance
2. Enable your new child theme and set it as the default.
3. Uninstall cwd_project.
4. Codify the config for the aforementioned theme changes.
5. Remove cwd_project from your code repo.
