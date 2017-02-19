# MUGL - Multi-Up Grocery List

MUGL aims to provide a useful spin on grocery shopping and general list making.

* [Download on Google Play Store](https://play.google.com/store/apps/details?id=com.onebillionsaved.mugl)

## Contributors

A special thanks to all that have helped, and continue to motivate:

1. Jerry & Cynthia McDaniel - hardware donation.
2. Summer Prince - pair coding, brain storming, daily inspiration.
3. Jon McCord - Original MUGL icons and ideas.

## Building MUGL

After setting up your Ionic environment:

1. Download/unzip source.
2. Run following commands in a terminal:

```bash
$ cd mugl_ionic
$ npm install
$ ionic run android # or ionic emulate ios
```

## Table Structure

<table>
  <tr>
    <th colspan="4">Items</th>    
  </tr>

  <tr>
    <th>id</th>
    <th>list_id</th>
    <th>text</th>
    <th>checked</th>
  </tr>

  <tr>
    <td>1</td>
    <td>1</td>
    <td>Apples</td>
    <td>0</td>
  </tr>

  <tr>
    <td>2</td>
    <td>1</td>
    <td>Bananas</td>
    <td>1</td>
  </tr>

  <tr>
    <td>3</td>
    <td>2</td>
    <td>Commit code</td>
    <td>1</td>
  </tr>
</table>

<table>
<tr>
  <th colspan="2">Lists</th>    
</tr>

<tr>
  <th>id</th>
  <th>list_title</th>  
</tr>

<tr>
  <td>1</td>
  <td>Groceries</td>  
</tr>

<tr>
  <td>2</td>
  <td>Programming</td>
</tr>

</table>

## Changelog

v1.1.0 17-02-19: Yarn support added, iOS swipe back disabled.

v1.0.9 17-02-12: Fixed bad bug preventing proper checking/unchecking of items, UI bounce disabled, dead code removed.

v1.0.8 17-02-04: Insert and update for items/lists improved.

v1.0.7 16-11-17: Swipe lists from left to right to access Delete and Edit now; prevents FAB covering them.

v1.0.6 16-11-17: Swipe items in list from left to right to access Delete and Edit now; prevents FAB covering them.

v1.0.5 16-11-17: Updated to latest Ionic app scripts.

v1.0.4 16-11-05: Updated to Ionic 2.0.0rc2, search bar added for items.

v1.0.3 16-11-01: Updated to latest Ionic build config. FABs now automatically dismiss and have improved icon.

v1.0.2 16-10-17: FABs added; ActionSheet added for delete items prompt; sorting now works regardless of case.

v1.0.1 16-10-16: Upgraded to Ionic 2.0.0rc1 and added splash screen.

v1.0.0 16-09-15: Converted project to Ionic. Plan to slowly regain previous native features and possibly port to iOS. Switching versioning to semver.org. Starting with fresh Git repo.

## Contributing to MUGL

Pull requests are welcome and encouraged! I will test any pull requests made and merge them in if they are non-trivial (ie, more than a simple whitespace correction).

## License

100% F/LOSS software, MIT licensed (see LICENSE). Copy/modify at will!
