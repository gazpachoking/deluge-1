/*!
 * Deluge.Formatters.js
 * 
 * Copyright (c) Damien Churchill 2009-2010 <damoxc@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, write to:
 *     The Free Software Foundation, Inc.,
 *     51 Franklin Street, Fifth Floor
 *     Boston, MA  02110-1301, USA.
 *
 * In addition, as a special exception, the copyright holders give
 * permission to link the code of portions of this program with the OpenSSL
 * library.
 * You must obey the GNU General Public License in all respects for all of
 * the code used other than OpenSSL. If you modify file(s) with this
 * exception, you may extend this exception to your version of the file(s),
 * but you are not obligated to do so. If you do not wish to do so, delete
 * this exception statement from your version. If you delete this exception
 * statement from all source files in the program, then also delete it here.
 */

/**
 * A collection of functions for string formatting values.
 * @class Deluge.Formatters
 * @author Damien Churchill <damoxc@gmail.com>
 * @version 1.3
 * @singleton
 */
Deluge.Formatters = {
    /**
     * Formats a date string in the locale's date representation based on the
     * systems timezone.
     *
     * @param {Number} timestamp time in seconds since the Epoch
     * @return {String} a string in the locale's date representation or ""
     * if seconds < 0
     */
    date: function(timestamp) {
        function zeroPad(num, count) {
            var numZeropad = num + '';
            while (numZeropad.length < count) {
                numZeropad = '0' + numZeropad;
            }
            return numZeropad;
        }
        timestamp = timestamp * 1000;
        var date = new Date(timestamp);
        return String.format('{0}/{1}/{2} {3}:{4}:{5}',
            zeroPad(date.getDate(), 2), zeroPad(date.getMonth() + 1, 2), date.getFullYear(),
            zeroPad(date.getHours(), 2), zeroPad(date.getMinutes(), 2), zeroPad(date.getSeconds(), 2));
    },
    
    /**
     * Formats the bytes value into a string with KiB, MiB or GiB units.
     *
     * @param {Number} bytes the filesize in bytes
     * @param {Boolean} showZero pass in true to displays 0 values
     * @return {String} formatted string with KiB, MiB or GiB units.
     */
    size: function(bytes, showZero) {
        if (!bytes && !showZero) return '';
        bytes = bytes / 1024.0;
    
        if (bytes < 1024) { return bytes.toFixed(1)  + ' KiB'; }
        else { bytes = bytes / 1024; }
    
        if (bytes < 1024) { return bytes.toFixed(1)  + ' MiB'; }
        else { bytes = bytes / 1024; }
    
        return bytes.toFixed(1) + ' GiB'
    },
    
    /**
     * Formats a string to display a transfer speed utilizing {@link #size}
     *
     * @param {Number} bytes the number of bytes per second
     * @param {Boolean} showZero pass in true to displays 0 values
     * @return {String} formatted string with KiB, MiB or GiB units.
     */
    speed: function(bytes, showZero) {
        return (!bytes && !showZero) ? '' : fsize(bytes, showZero) + '/s';
    },
    
    /**
     * Formats a string to show time in a human readable form.
     *
     * @param {Number} time the number of seconds
     * @return {String} a formatted time string. will return '' if seconds == 0
     */
    timeRemaining: function(time) {
        if (time == 0) { return '&infin;' }
        time = time.toFixed(0);
        if (time < 60) { return time + 's'; }
        else { time = time / 60; }
    
        if (time < 60) {
            var minutes = Math.floor(time)
            var seconds = Math.round(60 * (time - minutes))
            if (seconds > 0) {
                return minutes + 'm ' + seconds + 's';
            } else {
                return minutes + 'm'; }
            }
        else { time = time / 60; }
    
        if (time < 24) { 
            var hours = Math.floor(time)
            var minutes = Math.round(60 * (time - hours))
            if (minutes > 0) {
                return hours + 'h ' + minutes + 'm';
            } else {
                return hours + 'h';
            }            
        }
        else { time = time / 24; }
    
        var days = Math.floor(time)
        var hours = Math.round(24 * (time - days))
        if (hours > 0) {
            return days + 'd ' + hours + 'h';
        } else {
            return days + 'd';
        }
    },
    
    /**
     * Simply returns the value untouched, for when no formatting is required.
     *
     * @param {Mixed} value the value to be displayed
     * @return the untouched value.
     */
    plain: function(value) {
        return value;
    },

    cssClassEscape: function(value) {
        return value.toLowerCase().replace('.', '_');
    }
}
var fsize = Deluge.Formatters.size;
var fspeed = Deluge.Formatters.speed;
var ftime = Deluge.Formatters.timeRemaining;
var fdate = Deluge.Formatters.date;
var fplain = Deluge.Formatters.plain;
Ext.util.Format.cssClassEscape = Deluge.Formatters.cssClassEscape;
