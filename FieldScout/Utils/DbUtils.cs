using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.Data.SqlClient;

namespace FieldScout.Utils
{
    public class DbUtils
    {
        // Get a string from a data reader object and handle NULL values
        // name="reader" A SqlDataReader that has not exhausted its result set
        // name="column" The name of the column from the result set referred to by the reader
        // returns the value of the column or null
        public static string GetString(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetString(ordinal);
        }

        public static bool GetBoolean(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return false;
            }

            return reader.GetBoolean(ordinal);
        }

        // Get an int from a data reader object, assuming the result is not NULL
        // column and reader explained above
        public static int GetInt(SqlDataReader reader, string column)
        {
            return reader.GetInt32(reader.GetOrdinal(column));
        }

        // Get a DateTime from a data reader object, assumed the value is not NULL
        public static DateTime GetDateTime(SqlDataReader reader, string column)
        {
            return reader.GetDateTime(reader.GetOrdinal(column));
        }

        // Get an int? (nullable) from a data reader object and handle NULL values
        public static int? GetNullableInt(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetInt32(ordinal);
        }

        // Get a DateTime? (nullable) from a data reader object and gracefully handle NULL values
        public static DateTime? GetNullableDateTime(SqlDataReader reader, string column)
        {
            var ordinal = reader.GetOrdinal(column);
            if (reader.IsDBNull(ordinal))
            {
                return null;
            }

            return reader.GetDateTime(ordinal);
        }

        //Determines if the value of a given column is NULL
        public static bool IsDbNull(SqlDataReader reader, string column)
        {
            return reader.IsDBNull(reader.GetOrdinal(column));
        }

        // Determines if the value of a given column is not NULL
        public static bool isNotDbNull(SqlDataReader reader, string column)
        {
            return IsDbNull(reader, column);
        }

        // Add a parameter to the given SqlCommand object and handle NULL values
        public static void AddParameter(SqlCommand cmd, string name, object value)
        {
            if (value == null)
            {
                cmd.Parameters.AddWithValue(name, DBNull.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue(name, value);
            }
        }
    }
}
