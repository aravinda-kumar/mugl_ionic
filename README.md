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

v1.0.0 16-09-15: Converted project to Ionic. Plan to slowly regain previous native features and possibly port to iOS. Switching versioning to semver.org. Starting with fresh Git repo.

## License

100% F/LOSS software, MIT licensed (see MIT_License.txt). Copy/modify at will!
