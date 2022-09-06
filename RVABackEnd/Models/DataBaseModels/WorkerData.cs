using MySql.Data.MySqlClient;
using productionpkg;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RVABackEnd.DataBaseModels
{
    public class WorkerData
    {
        private MySqlConnection connection;
        private string server;
        private string database;
        private string uid;
        private string password;

        //Constructor
        public WorkerData()
        {
            Initialize();
        }

        //Initialize values
        private void Initialize()
        {
            server = "localhost";
            database = "rva";
            uid = "rva_project";
            password = "RVAProject19";
            string connectionString;
            connectionString = "SERVER=" + server + ";" + "DATABASE=" +
            database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";

            connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                //switch (ex.Number)
                //{
                //    case 0:
                //        MessageBox.Show("Cannot connect to server.  Contact administrator");
                //        break;

                //    case 1045:
                //        MessageBox.Show("Invalid username/password, please try again");
                //        break;
                //}
                return false;
            }
        }

        //Close connection
        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
                //MessageBox.Show(ex.Message);
                return false;
            }
        }

        //Insert statement
        public void Insert(Worker newWorker)
        {
            string query = "INSERT INTO WorkerData VALUES('" + newWorker.Username + "', '" + newWorker.Password + "', '" + newWorker.FirstName + "', '" + newWorker.LastName + "', '" + newWorker.Role + "', '" + (newWorker as ScholarWorker).FacultyName + "', '" + (newWorker as ScholarWorker).Index + "')";

            //open connection
            if (this.OpenConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                MySqlCommand cmd = new MySqlCommand(query, connection);

                //Execute command
                cmd.ExecuteNonQuery();

                //close connection
                this.CloseConnection();
            }
        }

        //Update statement
        public void Update(Worker modifyWorker)
        {
            string query = "UPDATE WorkerData SET passw='" + modifyWorker.Password + "', firstName='" + modifyWorker.FirstName + "', lastName='" + modifyWorker.LastName + "', role='" + modifyWorker.Role + "', faculty='" + (modifyWorker as ScholarWorker).FacultyName + "', studentID='" + (modifyWorker as ScholarWorker).Index + "' WHERE id='" + modifyWorker.Username + "'";

            //Open connection
            if (this.OpenConnection() == true)
            {
                //create mysql command
                MySqlCommand cmd = new MySqlCommand();
                //Assign the query using CommandText
                cmd.CommandText = query;
                //Assign the connection using Connection
                cmd.Connection = connection;

                //Execute query
                cmd.ExecuteNonQuery();

                //close connection
                this.CloseConnection();
            }
        }

        //Select statement
        public List<Worker> Select()
        {
            string query = "SELECT * FROM rva.workerdata;";

            //Create a list to store the result
            List<Worker> list = new List<Worker>();

            //Open connection
            if (this.OpenConnection() == true)
            {
                //Create Command
                MySqlCommand cmd = new MySqlCommand(query, connection);
                //Create a data reader and Execute the command
                MySqlDataReader dataReader = cmd.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    Worker worker;
                    if (dataReader["role"].ToString().Equals("scholar"))
                    {
                        worker = new ScholarWorker
                        {
                            Username = dataReader["id"].ToString(),
                            Password = dataReader["password"].ToString(),
                            FirstName = dataReader["firstName"].ToString(),
                            LastName = dataReader["lastName"].ToString(),
                            Role = dataReader["role"].ToString(),
                            FacultyName = dataReader["facultyName"].ToString(),
                            Index = dataReader["studentID"].ToString()
                        };
                    }
                    else
                    {
                        worker = new Worker
                        {
                            Username = dataReader["id"].ToString(),
                            Password = dataReader["password"].ToString(),
                            FirstName = dataReader["firstName"].ToString(),
                            LastName = dataReader["lastName"].ToString(),
                            Role = dataReader["role"].ToString()
                        };
                    }

                    list.Add(worker);
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                this.CloseConnection();

                //return list to be displayed
                return list;
            }
            else
            {
                return list;
            }
        }
    }
}
