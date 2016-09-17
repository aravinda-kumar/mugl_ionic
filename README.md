MUGL - Multi-Up Grocery List
=========

MUGL aims to provide a useful spin on grocery shopping and general list making.

* [Google Play Store](https://play.google.com/store/apps/details?id=com.onebillionsaved.mugl)

100% F/LOSS software, MIT licensed (see MIT License.txt). Copy/modify at will!

Contributors
---------

A special thanks to all that have helped, and continue to motivate:

1. Jerry & Cynthia McDaniel - hardware donation.
2. Summer Prince - pair coding, brain storming, daily inspiration.
3. Jon McCord - MUGL icons and ideas.

Building MUGL
---------

After setting up your Ionic environment
1. Download/unzip source.
2. Run following commands in a terminal:

		$ cd mugl_ionic
		$ npm install
		$ ionic run android # or ionic emulate ios

Changelog
---------

Recent changes:

v1.0.0 16-09-15: Converted project to Ionic. Plan to slowly regain previous native features and
possibly port to iOS. Switching versioning to semver.org. Starting with fresh Git repo.

v0.15 14-05-10: Many code improvements and enhancements, most not visible to user

v0.14 14-05-09: Improved color picker. Many small tweaks to clean up code base and prep
for more development. Removed most of the AmbilWarna code.

v0.13 13-10-21:  Added ability to add multiple items from insert new item dialog.
Just hit "enter" after each item and hit "OK" when finished. Added color pickers
via Ambilwarna project library. Converted project to Android Studio... no more
Eclipse for the project development!

v0.12 13-07-11:  Added preferences to application with ability to change button
text colors, more coming soon. Added MIT license into bundle of project on feeling
that it is even less restrictive than GNU.

v0.11 12-11-26: Persistent sort using PreferenceManager. Tweaked icons.

v0.10 12-10-29: Implemented DAL and BLL. Fixed "About" screen layout, added new
icons, temporarily disabled "Donate" button. Code documented much better.

v0.09 12-10-17: Complete rewrite of code. Fixed many glitches and implementation
snafus.

v0.08: New MUGL icons contributed by Jon McCord! Added him and others needing
credit to "About" page.

v0.07: Sort Alphabetically/by Status (non-persistent), Empty List.

v0.06: Single line input, blank input prevention, 25 char input limit. Updated
"About" page. Improved checked-item visibility differentiation. Heavy documentation
improvement.

v0.05: Added PayPal donate button to "About" dialog.

v0.04: Added "About" dialog to app menu.

v0.03: Persistent item strikethrough implemented, code optimizations.

v0.01: Application icon prettified.